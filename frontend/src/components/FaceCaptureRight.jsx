import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

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

const FaceCaptureRight = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      localStorage.setItem("rightImage", imageSrc);
    }
  };

  const uploadRightImage = async () => {
    const base64Image = localStorage.getItem("rightImage");
    const username = localStorage.getItem("username");

    if (!base64Image || !username) {
      console.warn("Missing right image or username");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("rightImage", dataURLtoBlob(base64Image), "right.jpg");
      formData.append("username", username);

      const response = await fetch("https://ss-aura-gaze-1528.onrender.com/auth/rightView", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("✅ Right View Upload Success:", data);
      console.log("Images saved to MongoDB:", data); // Added for MongoDB confirmation

      navigate("/dashboard"); 
    } catch (err) {
      console.error("❌ Right View Upload Failed:", err);
    } finally {
      setUploading(false);
    }
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
          src="../RightView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      <div className="flex justify-between items-center w-[400px] px-4">
        <button
          onClick={() => navigate("/leftview")}
          className="px-4 py-2 font-bold rounded-full bg-white text-indigo-600 hover:bg-indigo-100 shadow-md"
        >
          ←
        </button>

        <button
          onClick={capture}
          disabled={uploading}
          className={`px-6 py-2 font-semibold rounded-full shadow-md transition-all duration-300
            ${uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'}
          `}
        >
          {uploading ? "Uploading..." : "Capture"}
        </button>

        <button
          onClick={uploadRightImage}
          disabled={uploading}
          className={`px-4 py-2 font-bold rounded-full shadow-md
            ${uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-white text-indigo-600 hover:bg-indigo-100'}
          `}
        >
          →
        </button>
      </div>

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
