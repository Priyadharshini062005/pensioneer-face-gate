
import React from "react";
import { CircleCheck, CircleX, Clock, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface VerificationStatusProps {
  status: "success" | "failed" | "pending" | "processing" | null;
  onBackToDashboard: () => void;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ status, onBackToDashboard }) => {
  const renderStatus = () => {
    switch (status) {
      case "success":
        return {
          icon: <CircleCheck className="w-16 h-16 text-green-600 mb-3" />,
          title: "Verification Successful",
          text: "You are now verified to use pension services.",
          color: "text-green-700",
        };
      case "failed":
        return {
          icon: <CircleX className="w-16 h-16 text-red-600 mb-3" />,
          title: "Verification Failed",
          text: "Something went wrong. Please try again or contact support.",
          color: "text-red-700",
        };
      case "pending":
        return {
          icon: <Clock className="w-16 h-16 text-yellow-600 mb-3" />,
          title: "Pending Verification",
          text: "Your submission is under review. Please check back later.",
          color: "text-yellow-700",
        };
      case "processing":
        return {
          icon: <Loader2 className="w-16 h-16 animate-spin text-blue-600 mb-3" />,
          title: "Processing...",
          text: "We are verifying your identity. Please wait.",
          color: "text-blue-700",
        };
      default:
        return {
          icon: null,
          title: "Status Unknown",
          text: "No status to display.",
          color: "text-gray-700",
        };
    }
  };

  const { icon, title, text, color } = renderStatus();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
      {icon}
      <h2 className={`text-2xl font-bold ${color} mb-2`}>{title}</h2>
      <p className="text-gray-600 mb-6">{text}</p>
      <Button onClick={onBackToDashboard}>Back to Dashboard</Button>
    </div>
  );
};

export default VerificationStatus;
