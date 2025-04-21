import React, { useEffect, useState } from "react";

const Chat = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("📛 Username from localStorage:", username);

    if (!username) {
      setError("Username not found in localStorage");
      return;
    }

    fetch(`https://ss-aura-gaze-1528.onrender.com/auth/get-avatar?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.avatarUrl) {
          setAvatarUrl(data.avatarUrl);
        } else {
          setError("No Avatar found");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching avatar:", err);
        setError("Failed to load avatar");
      });
  }, []);

  return (
    <div className="p-6 text-center text-white bg-black h-screen">
      <h1 className="text-3xl font-bold mb-4">I'm all yours 😉😎!!!</h1>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-48 h-48 mx-auto rounded-full border-4 border-purple-500"
        />
      ) : (
        <p className="text-lg text-red-400">{error || "Loading avatar..."}</p>
      )}
    </div>
  );
};

export default Chat;
