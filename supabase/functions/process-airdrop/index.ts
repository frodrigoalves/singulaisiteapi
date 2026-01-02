import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create Supabase client with service role for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the user's JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing airdrop for user:', user.id);

    // Parse request body
    const { wallet_address } = await req.json();
    
    if (!wallet_address) {
      console.error('No wallet address provided');
      return new Response(
        JSON.stringify({ error: 'Wallet address required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user already received airdrop
    const { data: existingAirdrop, error: checkError } = await supabase
      .from('airdrops')
      .select('id, status')
      .eq('user_id', user.id)
      .single();

    if (existingAirdrop) {
      console.log('User already has airdrop:', existingAirdrop);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Airdrop já recebido anteriormente',
          airdrop: existingAirdrop
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create airdrop record
    const airdropAmount = 10000;
    const { data: airdrop, error: insertError } = await supabase
      .from('airdrops')
      .insert({
        user_id: user.id,
        wallet_address: wallet_address,
        amount: airdropAmount,
        status: 'completed', // In production, this would be 'pending' until blockchain tx confirms
        claimed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating airdrop:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to process airdrop' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a transaction record for the airdrop
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'reward',
        amount: airdropAmount,
        status: 'completed',
        description: 'Airdrop de boas-vindas SingulAI',
        to_address: wallet_address,
      });

    if (txError) {
      console.error('Error creating transaction record:', txError);
      // Don't fail the airdrop if transaction record fails
    }

    // Update user profile with wallet address
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ wallet_address: wallet_address })
      .eq('user_id', user.id);

    if (profileError) {
      console.error('Error updating profile:', profileError);
    }

    console.log('Airdrop successful:', airdrop);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Parabéns! Você recebeu ${airdropAmount.toLocaleString()} SGL tokens!`,
        airdrop: {
          id: airdrop.id,
          amount: airdrop.amount,
          wallet_address: airdrop.wallet_address,
          status: airdrop.status,
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
