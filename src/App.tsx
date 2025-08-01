import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleStyleHomepage from "@/components/GoogleStyleHomepage";
import SimpleLayout from "@/components/SimpleLayout";
import Influencers from "./pages/Influencers";
import Analytics from "./pages/Analytics";
import AddInfluencer from "./pages/AddInfluencer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoogleStyleHomepage />} />
          <Route path="/influencers" element={<SimpleLayout title="Influencers"><Influencers /></SimpleLayout>} />
          <Route path="/analytics" element={<SimpleLayout title="Analytics"><Analytics /></SimpleLayout>} />
          <Route path="/add" element={<SimpleLayout title="Add Influencer"><AddInfluencer /></SimpleLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
