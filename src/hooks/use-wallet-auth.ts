import { useState } from "react";
import { useAuth } from "./use-auth";

export function useWalletAuth() {
  const { user, isAuthenticated } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authenticateWithWallet = async () => {
    setIsAuthenticating(true);
    try {
      // Wallet auth is handled via Auth.tsx with private key
      return { success: isAuthenticated };
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    isConnected: isAuthenticated,
    isAuthenticating,
    authenticateWithWallet,
  };
}
