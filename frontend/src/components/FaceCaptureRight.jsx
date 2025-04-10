import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: 400,
  height: 300,
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
      {/* Webcam with guide */}
      <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-md w-[400px] h-[300px]">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-xl w-full h-full object-cover"
        />
        <img
          src="../RightView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      {/* Buttons Row: Back | Capture | Next */}
      <div className="flex justify-between items-center w-[400px] px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/leftview")}
          className="px-4 py-2 font-bold rounded-full bg-white text-indigo-600 hover:bg-indigo-100 shadow-md"
        >
          ←
        </button>

        {/* Capture Button */}
        <button
          onClick={capture}
          disabled={uploading}
          className={`px-6 py-2 font-semibold rounded-full shadow-md transition-all duration-300
            ${uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'}
          `}
        >
          {uploading ? "Uploading..." : "Capture Left"}
        </button>

        {/* Next Button */}
        <button
          onClick={() => navigate("/")}
           className="px-4 py-2 font-bold rounded-full bg-white text-indigo-600 hover:bg-indigo-100 shadow-md"
        >
          →
        </button>
      </div>

      {/* Preview */}
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
