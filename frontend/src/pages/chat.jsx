import React, { useEffect, useState } from "react";

const Chat = () => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatarUrl");
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold">Your Bestfriend is Here! 💖</h1>

      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Bestfriend Avatar"
          className="w-48 h-48 mt-6 rounded-full border-4 border-purple-500"
        />
      ) : (
        <p className="text-lg mt-6">No avatar found.</p>
      )}

      {/* Your chat UI can be here */}
    </div>
  );
};

export default Chat;
