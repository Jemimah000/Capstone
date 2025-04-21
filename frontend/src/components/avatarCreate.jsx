import React, { useEffect } from "react";

const AvatarCreate = ({ onAvatarSaved }) => {
  useEffect(() => {
    const iframe = document.getElementById("rpm-frame");

    const receiveMessage = (event) => {
      const json = event.data;
      if (typeof json === "string") {
        try {
          const parsedData = JSON.parse(json);
          if (
            parsedData?.source === "readyplayerme" &&
            parsedData?.eventName === "v1.avatar.exported"
          ) {
            const url = parsedData.data?.url;
            console.log("🎯 Avatar URL:", url);

            localStorage.setItem("avatarUrl", url);

            const username = localStorage.getItem("username");
            fetch("https://ss-aura-gaze-1528.onrender.com/auth/save-avatar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, avatarUrl: url }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("✅ Avatar saved in DB!", data);
                if (onAvatarSaved) onAvatarSaved(url);
              })
              .catch((err) => console.error("❌ Error saving avatar:", err));
          }
        } catch (err) {
          console.error("❌ Error parsing message:", err);
        }
      }
    };

    window.addEventListener("message", receiveMessage);

    iframe?.contentWindow?.postMessage(
      JSON.stringify({
        target: "readyplayerme",
        type: "subscribe",
        eventName: "v1.avatar.exported",
      }),
      "*"
    );

    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  return (
    <iframe
      id="rpm-frame"
      title="Ready Player Me"
      allow="camera *; microphone *"
      src="https://readyplayer.me/avatar?frameApi&clearCache&hideUI=button"
      className="w-full h-full border-none"
    ></iframe>
  );
};

export default AvatarCreate;
