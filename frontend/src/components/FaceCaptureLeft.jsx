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

const FaceCaptureLeft = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      localStorage.setItem("leftImage", imageSrc);
    }
  };
  const uploadImage = async () => {
    const base64Image = localStorage.getItem("leftImage");
    const username = localStorage.getItem("username"); // 💡 Fetch username from localStorage
  
    if (!base64Image || !username) {
      console.warn("Missing left image or username");
      return;
    }
  
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("leftImage", dataURLtoBlob(base64Image), "left.jpg");
      formData.append("username", username); // 💥 Add username to formData
  
      const response = await fetch("http://localhost:5004/api/upload-left", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log("✅ Left View Upload Success:", data);
  
      navigate("/rightview");
    } catch (err) {
      console.error("❌ Left View Upload Failed:", err);
    }
    setUploading(false);
  };  

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Webcam Feed */}
      <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-md w-[400px] h-[300px]">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-xl w-full h-full object-cover"
        />

        {/* Guide Image */}
        <img
          src="../LeftView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      {/* Buttons Row */}
      <div className="flex justify-between items-center w-[400px] px-4">
        <button
          onClick={() => navigate("/frontview")}
          className="px-4 py-2 font-bold rounded-full bg-white text-indigo-600 hover:bg-indigo-100 shadow-md"
        >
          ←
        </button>

        <button
          onClick={capture}
          className="px-6 py-2 font-semibold rounded-full shadow-md bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
        >
          Capture Left
        </button>

        <button
          onClick={uploadImage}
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

      {/* Preview */}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured Left"
          className="mt-4 w-[300px] rounded-lg border"
        />
      )}
    </div>
  );
};

export default FaceCaptureLeft;
