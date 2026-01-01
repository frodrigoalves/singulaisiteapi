import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Connect from "./pages/Connect";
import { DashboardLayout } from "./components/dashboard/dashboard-layout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import TokensPage from "./pages/dashboard/TokensPage";
import StakingPage from "./pages/dashboard/StakingPage";
import AvatarPage from "./pages/dashboard/AvatarPage";
import TimeCapsulePage from "./pages/dashboard/TimeCapsulePage";
import LegacyPage from "./pages/dashboard/LegacyPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="tokens" element={<TokensPage />} />
              <Route path="staking" element={<StakingPage />} />
              <Route path="avatar" element={<AvatarPage />} />
              <Route path="timecapsule" element={<TimeCapsulePage />} />
              <Route path="legacy" element={<LegacyPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
