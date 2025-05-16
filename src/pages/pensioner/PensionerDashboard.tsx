
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import PageLayout from "../../components/layout/PageLayout";
import { useAuth } from "../../context/AuthContext";
import { Camera, Clock, CircleCheck, CircleX } from "lucide-react";

const PensionerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: string | null | undefined) => {
    switch (status) {
      case "success":
        return <CircleCheck className="h-8 w-8 text-secondary" />;
      case "failed":
        return <CircleX className="h-8 w-8 text-danger" />;
      case "pending":
        return <Clock className="h-8 w-8 text-accent" />;
      default:
        return <Clock className="h-8 w-8 text-gray-400" />;
    }
  };

  const getStatusClass = (status: string | null | undefined) => {
    switch (status) {
      case "success":
        return "bg-green-50 text-secondary";
      case "failed":
        return "bg-red-50 text-danger";
      case "pending":
        return "bg-orange-50 text-accent";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusText = (status: string | null | undefined) => {
    switch (status) {
      case "success":
        return "Verified";
      case "failed":
        return "Failed";
      case "pending":
        return "Pending";
      default:
        return "Not Verified";
    }
  };

  const startVerification = () => {
    navigate("/pensioner/verification/start");
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-primary-800">Pensioner Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Aadhaar Number</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{user?.aadhaarNumber || "Not available"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Last Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{formatDate(user?.lastVerification)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Status</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-2">
                {getStatusIcon(user?.verificationStatus)}
                <span className={`rounded-full px-2 py-1 text-sm font-medium ${getStatusClass(user?.verificationStatus)}`}>
                  {getStatusText(user?.verificationStatus)}
                </span>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Face Verification</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-gray-600 mb-6 text-center">
                Verify your identity using facial recognition to continue receiving pension benefits.
                The verification process takes just a few minutes.
              </p>
              
              <Button onClick={startVerification} className="flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                Start Face Verification
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Having trouble with verification? Get in touch with our support team.
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/support")}>
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  View your previous verification attempts and their status.
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/pensioner/history")}>
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PensionerDashboard;
