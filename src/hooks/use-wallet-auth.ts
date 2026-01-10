import { useCallback, useEffect, useState } from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useWalletAuth() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Generate a nonce for signing
  const generateNonce = () => {
    return `Sign this message to authenticate with SingulAI.\n\nNonce: ${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  };

  // Authenticate with wallet signature
  const authenticateWithWallet = useCallback(async () => {
    if (!address || !isConnected) {
      toast({
        title: 'Erro',
        description: 'Conecte sua wallet primeiro.',
        variant: 'destructive',
      });
      return { success: false };
    }

    setIsAuthenticating(true);

    try {
      // Create a message to sign
      const message = generateNonce();
      
      // Request signature from wallet
      const signature = await signMessageAsync({ 
        message,
        account: address,
      });

      // Use wallet address as email (for Supabase auth compatibility)
      const walletEmail = `${address.toLowerCase()}@wallet.singulai.site`;
      const walletPassword = signature.slice(0, 64); // Use part of signature as password

      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: walletEmail,
        password: walletPassword,
      });

      if (signInData.session) {
        // Update profile with wallet address
        await supabase
          .from('profiles')
          .update({ wallet_address: address })
          .eq('user_id', signInData.user?.id);

        setIsAuthenticated(true);
        toast({
          title: 'Bem-vindo!',
          description: 'Conectado com sucesso.',
        });
        return { success: true, session: signInData.session };
      }

      // If sign in failed, try to sign up
      if (signInError) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: walletEmail,
          password: walletPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              display_name: `${address.slice(0, 6)}...${address.slice(-4)}`,
              wallet_address: address,
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        if (signUpData.session) {
          setIsAuthenticated(true);
          toast({
            title: 'Conta criada!',
            description: 'Bem-vindo ao SingulAI.',
          });
          return { success: true, session: signUpData.session };
        }
      }

      return { success: false };
    } catch (error: any) {
      console.error('Wallet auth error:', error);
      toast({
        title: 'Erro na autenticação',
        description: error.message || 'Falha ao autenticar com wallet.',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsAuthenticating(false);
    }
  }, [address, isConnected, signMessageAsync, toast]);

  // Disconnect wallet and sign out
  const disconnectWallet = useCallback(async () => {
    disconnect();
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast({
      title: 'Desconectado',
      description: 'Wallet desconectada com sucesso.',
    });
  }, [disconnect, toast]);

  return {
    address,
    isConnected,
    isAuthenticating,
    isAuthenticated,
    authenticateWithWallet,
    disconnectWallet,
  };
}
