
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import PageLayout from "../../components/layout/PageLayout";
import WebcamCapture from "../../components/verification/WebcamCapture";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const steps = [
  {
    id: "front",
    title: "Front Face Capture",
    instruction: "Look directly at the camera with a neutral expression",
  },
  {
    id: "left",
    title: "Left Profile Capture",
    instruction: "Slightly turn your head to the left",
  },
  {
    id: "right",
    title: "Right Profile Capture",
    instruction: "Slightly turn your head to the right",
  },
];

const VerificationCapture: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [captures, setCaptures] = useState<Record<string, string | null>>({
    front: null,
    left: null,
    right: null,
  });

  const handleCapture = (imageSrc: string | null) => {
    const stepId = steps[currentStep].id;
    setCaptures((prev) => ({ ...prev, [stepId]: imageSrc }));

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 500);
    } else {
      // All captures done, proceed to processing
      submitVerification();
    }
  };

  const submitVerification = () => {
    toast({
      title: "Processing verification",
      description: "Your face verification data is being processed...",
    });
    
    // In a real app, you would send the images to your backend for processing
    // For demo purposes, we'll simulate processing and redirect
    navigate("/pensioner/verification/status");
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/pensioner/verification/start");
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousStep}
                  className="flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <div className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
              <CardTitle className="text-center text-xl">
                {currentStepData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <WebcamCapture
                onCapture={handleCapture}
                instructionText={currentStepData.instruction}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default VerificationCapture;
