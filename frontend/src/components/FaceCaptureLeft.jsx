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

const FaceCaptureLeft = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      localStorage.setItem("leftImage", imageSrc);
    }
  };

  const uploadImage = async () => {
    const base64Image = localStorage.getItem("leftImage");
    const username = localStorage.getItem("username");

    if (!base64Image || !username) {
      console.warn("Missing left image or username");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("leftImage", dataURLtoBlob(base64Image), "left.jpg");
      formData.append("username", username);

      const response = await fetch("https://ss-aura-gaze-1528.onrender.com/auth/leftView", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server responded with error:", errorText);
        return;
      }

      const data = await response.json();
      console.log("✅ Left View Upload Success:", data);
      console.log("Images saved to MongoDB:", data);

      navigate("/rightview");
    } catch (error) {
      console.error("❌ Something went wrong during upload:", error);
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
          src="../LeftView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      <div className="flex justify-between items-center w-[400px] px-4">
        <button
          onClick={() => navigate("/frontview")}
          className="px-4 py-2 font-bold rounded-full bg-white text-indigo-600 hover:bg-indigo-100 shadow-md"
        >
          ←
        </button>

        <button
          onClick={capture}
          className="px-6 py-2 font-semibold rounded-full shadow-md bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
        >
          Capture
        </button>

        <button
          onClick={uploadImage}
          className="px-4 py-2 font-bold rounded-full shadow-md bg-white text-indigo-600 hover:bg-indigo-100"
        >
          →
        </button>
      </div>

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
