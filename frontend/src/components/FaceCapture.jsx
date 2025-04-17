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

const FaceCapture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      localStorage.setItem("frontImage", imageSrc);
    }
  };

  const uploadImage = async () => {
    const base64Image = localStorage.getItem("frontImage");
    const username = localStorage.getItem("username"); 

    if (!base64Image || !username) {
      console.warn("Missing front image or username");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("frontImage", dataURLtoBlob(base64Image), "front.jpg");
      formData.append("username", username); 

      const response = await fetch("https://ss-aura-gaze-1528.onrender.com/api/front", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Front View Upload Success:", data);
        // Navigate to the left page after successful upload
        navigate("/leftView"); // or any other page you want
      } else {
        console.error("❌ Upload failed:", data);
      }
    } catch (err) {
      console.error("❌ Front View Upload Failed:", err);
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
          src="../FrontView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      {/* Buttons Row: Back | Capture | Next */}
      <div className="flex justify-between items-center w-[400px] px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
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
          {uploading ? "Uploading..." : "Capture Front"}
        </button>

        {/* Next Button */}
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
          alt="Captured Front"
          className="mt-4 w-[300px] rounded-lg border"
        /> 
      )}
    </div>
  );
};

export default FaceCapture;
