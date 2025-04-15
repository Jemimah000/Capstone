import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 400,
  height: 300,
  facingMode: 'user',
};

const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

const FaceCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    localStorage.setItem("frontImage", imageSrc);
  };

  const handleNext = async () => {
    if (!capturedImage) return;
  
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("frontImage", dataURLtoBlob(capturedImage), "front.jpg");
  
      // ✨ Add username from localStorage
      const username = localStorage.getItem("username");
      formData.append("username", username);
  
      const response = await fetch("http://localhost:5004/api/upload-front", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log("✅ Front View Upload Success:", data);
  
      navigate("/leftview");
    } catch (err) {
      console.error("❌ Front View Upload Failed:", err);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-md w-[400px] h-[300px]">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-xl w-full h-full object-cover"
        />
        <img
          src="../FrontView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      <div className="flex items-center justify-between w-[400px] px-4">
        <div className="w-10" />
        <button
          onClick={capture}
          disabled={uploading}
          className={`px-6 py-2 font-semibold rounded-full shadow-md transition-all duration-300
            ${uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'}
          `}
        >
          {uploading ? "Uploading..." : "Capture"}
        </button>

        <button
          onClick={handleNext}
          disabled={uploading || !capturedImage}
          className="px-4 py-2 font-bold rounded-full bg-white text-indigo-600 hover:bg-indigo-100 shadow-md"
        >
          →
        </button>
      </div>

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="mt-4 w-[300px] rounded-lg border"
        />
      )}
    </div>
  );
};

export default FaceCapture;
