import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: 320,
  height: 240,
  facingMode: 'user',
};

const FaceCaptureRight = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    uploadImage(imageSrc);
  };

  const uploadImage = async (base64Image) => {
    setUploading(true);
    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: base64Image, view: "right" })
      });

      const data = await response.json();
      console.log("✅ Right View Upload Success:", data);

      navigate("/avatar");
    } catch (error) {
      console.error("❌ Right View Upload Failed:", error);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-md">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-xl w-full h-[350px] object-cover"
        />
        <img
          src="../RightView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      <button
        onClick={capture}
        disabled={uploading}
        className={`px-6 py-2 font-semibold rounded-full shadow-md transition-all duration-300
          ${uploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'}
        `}
      >
        {uploading ? "Uploading..." : "Capture Right"}
      </button>

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured Right"
          className="mt-4 w-[300px] rounded-lg border"
        />
      )}
    </div>
  );
};

export default FaceCaptureRight;
