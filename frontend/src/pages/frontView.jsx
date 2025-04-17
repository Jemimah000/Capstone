import React from 'react';
import FaceCapture from '../components/FaceCapture';

function FrontView() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-[500px] space-y-6">
        <h1 className="text-3xl font-bold text-white text-center font-[Playfair_Display] tracking-wide">
          Scan Your Face
        </h1>

        <FaceCapture />
      </div>
    </div>
  );
}

export default FrontView;
