import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 320,
  height: 240,
  facingMode: 'user',
};

const FaceCapture = () => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('Captured image:', imageSrc);
    // You can send this to backend or preview/save
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Webcam Box */}
      <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-md">
      <Webcam
  audio={false}
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  className="rounded-xl w-full h-[350px] object-cover"
/>
        {/* Guide image at top-right corner */}
        <img
          src="../FrontView.jpeg"
          alt="Guide"
          className="absolute top-2 right-2 w-16 h-16 rounded-md shadow-lg border border-white/30 object-cover"
        />
      </div>

      {/* Capture Button */}
      <button
        onClick={capture}
        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-full shadow-md transition-all duration-300"
      >
        Capture
      </button>
    </div>
  );
};

export default FaceCapture;
