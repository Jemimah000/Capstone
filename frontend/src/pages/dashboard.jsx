import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarCreate from "../components/avatarCreate";

const Dashboard = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleAvatarSaved = (url) => {
    setAvatarUrl(url); // store exported avatar URL
  };

  const handleSaveClick = () => {
    if (avatarUrl) {
      navigate("/chat");
    } else {
      alert("Please export your avatar first.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black relative">
      {/* Title */}
      <div className="text-center text-white text-3xl font-bold py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
        ✨ Create Your Bestfriend ✨
      </div>

      {/* Save Button - Top Right, slightly below */}
      <div className="absolute top-21 right-8 z-50">
        <button
          onClick={handleSaveClick}
          className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold rounded-xl shadow-md text-base hover:scale-105 transition duration-300 ease-in-out"
        >
          Save
        </button>
      </div>

      {/* Avatar Creator */}
      <div className="flex-1">
        <AvatarCreate onAvatarSaved={handleAvatarSaved} />
      </div>
    </div>
  );
};

export default Dashboard;
