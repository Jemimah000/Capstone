import React, { useRef, useState } from "react";

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const capture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);

    uploadImage(imageData); // Send to backend
  };

  const uploadImage = async (base64Image) => {
    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();
    console.log("Upload Response:", data);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <video ref={videoRef} autoPlay className="rounded-xl w-[400px] h-[300px]" />
      <button onClick={startCamera} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Start Camera</button>
      <button onClick={capture} className="px-4 py-2 bg-green-600 text-white rounded-lg">Capture</button>

      {capturedImage && (
        <img src={capturedImage} alt="Captured" className="mt-4 w-[300px] rounded-lg border" />
      )}
    </div>
  );
};

export default WebcamCapture;
