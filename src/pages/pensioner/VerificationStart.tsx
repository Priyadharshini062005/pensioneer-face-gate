
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import PageLayout from "../../components/layout/PageLayout";
import { Camera, Info, ShieldCheck } from "lucide-react";

const VerificationStart: React.FC = () => {
  const navigate = useNavigate();

  const startVerification = () => {
    navigate("/pensioner/verification/capture");
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Face Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-primary-50 p-4 rounded-full">
                  <Camera className="h-16 w-16 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Before You Begin</h3>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        This verification process will use your device's camera to verify your identity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Please ensure:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>You are in a well-lit area</li>
                    <li>Your face is clearly visible</li>
                    <li>Remove any face coverings (except for religious purposes)</li>
                    <li>Look directly at the camera</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <p className="text-sm text-gray-700">
                    Your biometric data is encrypted and securely processed in compliance with data protection regulations.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/pensioner/dashboard")}>
                Cancel
              </Button>
              <Button onClick={startVerification}>
                Continue to Verification
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default VerificationStart;
