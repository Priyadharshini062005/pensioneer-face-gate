
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "../ui/button";
import { Loader2, Camera, RefreshCw } from "lucide-react";

interface WebcamCaptureProps {
  onCapture: (imageSrc: string | null) => void;
  instructionText: string;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, instructionText }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Set ideal webcam settings for face detection
  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  // Handle successful camera initialization
  const handleCameraReady = () => {
    setIsCameraReady(true);
    setCameraError(null);
  };

  // Handle camera errors
  const handleCameraError = (error: string | DOMException) => {
    console.error("Camera error:", error);
    setCameraError("Could not access camera. Please check permissions.");
    setIsCameraReady(false);
  };

  // Capture image from webcam
  const captureImage = useCallback(() => {
    setIsLoading(true);
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsLoading(false);
    }
  }, [webcamRef]);

  // Retry/reset capture
  const retryCapture = () => {
    setCapturedImage(null);
  };

  // Confirm and send the captured image to parent component
  const confirmCapture = useCallback(() => {
    onCapture(capturedImage);
  }, [capturedImage, onCapture]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold text-center text-primary-700 mb-4">
          {instructionText}
        </h3>

        {cameraError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
            <p>{cameraError}</p>
            <Button 
              className="mt-2" 
              onClick={() => {
                setCameraError(null);
                setIsCameraReady(false);
              }}
            >
              Try Again
            </Button>
          </div>
        ) : capturedImage ? (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-auto rounded-md"
            />
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-md">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-auto rounded-md"
              onUserMedia={handleCameraReady}
              onUserMediaError={handleCameraError}
            />
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-gray-700">Starting camera...</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-4">
          {capturedImage ? (
            <>
              <Button
                variant="outline"
                onClick={retryCapture}
                className="flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake
              </Button>
              <Button onClick={confirmCapture} className="flex items-center">
                Confirm
              </Button>
            </>
          ) : (
            <Button
              onClick={captureImage}
              disabled={!isCameraReady || isLoading}
              className="flex items-center"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Camera className="h-4 w-4 mr-2" />
              )}
              Capture
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
