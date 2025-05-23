
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Home from "./Home";

const Index: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Only redirect if explicitly authenticated and user data exists
    if (isAuthenticated && user && user.role) {
      if (user.role === "pensioner") {
        navigate("/pensioner/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return <Home />;
};

export default Index;
