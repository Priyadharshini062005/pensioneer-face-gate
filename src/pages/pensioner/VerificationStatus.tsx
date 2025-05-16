
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import VerificationStatus from "../../components/verification/VerificationStatus";

const VerificationStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"success" | "failed" | "pending" | "processing" | null>(
    "processing"
  );

  useEffect(() => {
    // Simulate verification processing
    // In a real app, this would be a call to check the status from your API
    const timer = setTimeout(() => {
      // For demo purposes, randomly choose a result
      const results: Array<"success" | "failed" | "pending"> = [
        "success", 
        "success", 
        "success", 
        "failed", 
        "pending"
      ];
      const randomIndex = Math.floor(Math.random() * results.length);
      setStatus(results[randomIndex]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackToDashboard = () => {
    navigate("/pensioner/dashboard");
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center text-primary-700">
            Verification Result
          </h1>
          <VerificationStatus
            status={status}
            onBackToDashboard={handleBackToDashboard}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default VerificationStatusPage;
