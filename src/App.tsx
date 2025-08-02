import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import GoogleStyleHomepage from "@/components/GoogleStyleHomepage";
import SimpleLayout from "@/components/SimpleLayout";
import Influencers from "./pages/Influencers";
import Analytics from "./pages/Analytics";
import AddInfluencer from "./pages/AddInfluencer";
import SupabaseExample from "@/components/SupabaseExample";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/hooks/useSupabase";

const queryClient = new QueryClient();

// Component to handle redirects for authenticated users away from auth pages
const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          } />
          <Route path="/signup" element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          } />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <GoogleStyleHomepage />
            </ProtectedRoute>
          } />
          <Route path="/influencers" element={
            <ProtectedRoute>
              <SimpleLayout>
                <Influencers />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <SimpleLayout>
                <Analytics />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/add" element={
            <ProtectedRoute>
              <SimpleLayout>
                <AddInfluencer />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <SimpleLayout>
                <Profile />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/supabase" element={
            <ProtectedRoute>
              <SimpleLayout>
                <SupabaseExample />
              </SimpleLayout>
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
