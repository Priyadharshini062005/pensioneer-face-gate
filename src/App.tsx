
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Index";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";

// Pensioner Pages
import PensionerDashboard from "./pages/pensioner/PensionerDashboard";
import VerificationStart from "./pages/pensioner/VerificationStart";
import VerificationCapture from "./pages/pensioner/VerificationCapture";
import VerificationStatusPage from "./pages/pensioner/VerificationStatus";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/support" element={<Support />} />

            {/* Pensioner Routes */}
            <Route
              path="/pensioner/dashboard"
              element={
                <ProtectedRoute allowedRoles={["pensioner"]}>
                  <PensionerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pensioner/verification/start"
              element={
                <ProtectedRoute allowedRoles={["pensioner"]}>
                  <VerificationStart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pensioner/verification/capture"
              element={
                <ProtectedRoute allowedRoles={["pensioner"]}>
                  <VerificationCapture />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pensioner/verification/status"
              element={
                <ProtectedRoute allowedRoles={["pensioner"]}>
                  <VerificationStatusPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
