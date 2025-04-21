import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarCreate from "../components/avatarCreate";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNextButton, setShowNextButton] = useState(false);

  const handleAvatarSaved = () => {
    setShowNextButton(true); // Show "Save →" after avatar is exported and saved
  };

  const handleNext = () => {
    navigate("/chat");
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black">
      <div className="text-center text-white text-3xl font-bold py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
        ✨ Create Your Bestfriend ✨
      </div>

      <div className="flex-1 relative">
        <AvatarCreate onAvatarSaved={handleAvatarSaved} /> {/* AvatarCreate component */}
        
        {showNextButton && (
          <div className="absolute top-[12px] right-[30px] z-50">
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-white font-semibold rounded-2xl shadow-md text-lg"
            >
              Save →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
