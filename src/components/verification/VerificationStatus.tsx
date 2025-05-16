
import React from "react";
import { CircleCheck, CircleX, Clock, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface VerificationStatusProps {
  status: "success" | "failed" | "pending" | "processing" | null;
  onBackToDashboard: () => void;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  status,
  onBackToDashboard,
}) => {
  const renderStatusContent = () => {
    switch (status) {
      case "success":
        return (
          <div className="text-center flex flex-col items-center">
            <CircleCheck className="h-24 w-24 text-secondary mb-4" />
            <h2 className="text-2xl font-bold text-secondary mb-2">Verification Successful</h2>
            <p className="text-gray-600 mb-6">
              Your identity has been verified successfully. You may continue using the pension services.
            </p>
            <Button onClick={onBackToDashboard}>Back to Dashboard</Button>
          </div>
        );
      
      case "failed":
        return (
          <div className="text-center flex flex-col items-center">
            <CircleX className="h-24 w-24 text-danger mb-4" />
            <h2 className="text-2xl font-bold text-danger mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your identity. Please try again or contact support for assistance.
            </p>
            <div className="flex space-x-4">
              <Button onClick={onBackToDashboard} variant="outline">Back to Dashboard</Button>
              <Button>Try Again</Button>
            </div>
          </div>
        );
      
      case "pending":
        return (
          <div className="text-center flex flex-col items-center">
            <Clock className="h-24 w-24 text-accent mb-4" />
            <h2 className="text-2xl font-bold text-accent mb-2">Verification Pending</h2>
            <p className="text-gray-600 mb-6">
              Your verification request is pending review. Please check back later.
            </p>
            <Button onClick={onBackToDashboard} variant="outline">Back to Dashboard</Button>
          </div>
        );
      
      case "processing":
        return (
          <div className="text-center flex flex-col items-center">
            <Loader2 className="h-24 w-24 text-primary animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Processing...</h2>
            <p className="text-gray-600 mb-6">
              We are processing your verification request. This may take a few moments.
            </p>
          </div>
        );
      
      default:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">No Verification Status</h2>
            <Button onClick={onBackToDashboard}>Back to Dashboard</Button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {renderStatusContent()}
    </div>
  );
};

export default VerificationStatus;
