import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressDisplay } from "@/components/web3/address-display";
import { User, Globe, Bell, Shield, Wallet, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        </div>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Display Name</label>
            <Input placeholder="Enter your display name" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Email (for notifications)</label>
            <Input type="email" placeholder="your@email.com" />
          </div>
          <Button variant="default">Save Profile</Button>
        </div>
      </GlassCard>

      {/* Preferences */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
        </div>
        
        <div className="space-y-6 max-w-md">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Language</label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Portugues</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Theme</label>
            <Select defaultValue="dark">
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Currency Display</label>
            <Select defaultValue="usd">
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="brl">BRL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </GlassCard>

      {/* Wallet */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Wallet</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Connected Wallet</label>
            <AddressDisplay address="0x7F3a4B2c8D9E1f6A5B3C2D8E9F1A6B3C8D2E8B2c" />
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">Switch Wallet</Button>
            <Button variant="outline" className="text-destructive hover:text-destructive gap-2">
              <LogOut className="w-4 h-4" />
              Disconnect
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Browser Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified in your browser</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Transaction Alerts</p>
              <p className="text-sm text-muted-foreground">Notify on all transactions</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
