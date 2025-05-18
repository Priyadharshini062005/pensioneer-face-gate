
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { Button } from "../ui/button";
import { Loader2, Camera, RefreshCw } from "lucide-react";

interface WebcamCaptureProps {
  onCapture: (image: string | null) => void;
  instructionText: string;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, instructionText }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  useEffect(() => {
    faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  }, []);

  const handleCameraReady = () => setIsCameraReady(true);

  const handleCameraError = (error: any) => {
    setCameraError("Camera access failed. Please check permissions.");
    console.error(error);
  };

  const detectFace = async () => {
    const video = webcamRef.current?.video;
    if (video) {
      const detection = await faceapi.detectSingleFace(video as HTMLVideoElement, new faceapi.TinyFaceDetectorOptions());
      setFaceDetected(!!detection);
    }
  };

  useEffect(() => {
    if (isCameraReady) {
      const interval = setInterval(detectFace, 1000);
      return () => clearInterval(interval);
    }
  }, [isCameraReady]);

  const captureImage = useCallback(() => {
    if (!faceDetected) {
      alert("No face detected. Please align your face in the frame.");
      return;
    }
    setIsLoading(true);
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imageSrc || null);
    setIsLoading(false);
  }, [faceDetected]);

  const handleRetake = () => setCapturedImage(null);
  const handleConfirm = () => onCapture(capturedImage);

  return (
    <div className="max-w-md w-full mx-auto bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">{instructionText}</h2>

      {cameraError ? (
        <div className="text-red-600 text-center mb-4">
          {cameraError}
          <Button className="mt-2" onClick={() => setCameraError(null)}>Retry</Button>
        </div>
      ) : capturedImage ? (
        <img src={capturedImage} alt="Captured" className="rounded-md mb-4" />
      ) : (
        <div className="relative mb-4">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleCameraReady}
            onUserMediaError={handleCameraError}
            className="rounded-md w-full"
          />
          {!isCameraReady && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
              <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
              <span className="ml-2 text-gray-700">Initializing camera...</span>
            </div>
          )}
          {isCameraReady && !faceDetected && (
            <div className="absolute bottom-0 w-full text-center bg-yellow-100 text-yellow-800 py-1 text-sm">
              No face detected
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center space-x-3">
        {capturedImage ? (
          <>
            <Button variant="outline" onClick={handleRetake}>
              <RefreshCw className="w-4 h-4 mr-2" /> Retake
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </>
        ) : (
          <Button onClick={captureImage} disabled={!isCameraReady || isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
            Capture
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
