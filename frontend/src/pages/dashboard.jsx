import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNextButton, setShowNextButton] = useState(true);  // State to control the button visibility

  useEffect(() => {
    const iframe = document.getElementById("rpm-frame");

    window.addEventListener("message", (event) => {
      const json = event.data;
      if (typeof json === "string") {
        try {
          const parsedData = JSON.parse(json);
          if (
            parsedData?.source === "readyplayerme" &&
            parsedData?.eventName === "v1.avatar.exported"
          ) {
            const avatarUrl = parsedData.data?.url;
            console.log("✨ Avatar URL:", avatarUrl);

            const username = localStorage.getItem("username");
            fetch("https://ss-aura-gaze-1528.onrender.com/auth/save-avatar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, avatarUrl }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("✅ Avatar saved!", data);
                setShowNextButton(true);  // Show the button after saving avatar
              });

            setShowNextButton(false);  // Hide the button while avatar is being exported
          }
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      }
    });

    iframe?.contentWindow?.postMessage(
      JSON.stringify({
        target: "readyplayerme",
        type: "subscribe",
        eventName: "v1.avatar.exported",
      }),
      "*"
    );
  }, []);

  const handleNext = () => {
    navigate("/chat");
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black">
      <div className="text-center text-white text-3xl font-bold py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
        ✨ Create Your Bestfriend ✨
      </div>

      <div className="flex-1 relative">
        <iframe
          id="rpm-frame"
          title="Ready Player Me"
          allow="camera *; microphone *"
          src="https://readyplayer.me/avatar?frameApi"
          className="w-full h-full border-none"
        ></iframe>

        {/* Conditionally render the Next button at the top right with a full opacity gradient */}
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
