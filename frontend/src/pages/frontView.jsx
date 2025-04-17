import React, { useEffect } from 'react';
import FaceCapture from '../components/FaceCapture';

function FrontView() {
  useEffect(() => {
    const uploadFrontImage = async (imageData, username) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload/front`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            image: imageData,
          }),
        });

        const result = await response.json();
        console.log('Upload Response:', result); // ✅ This shows success
      } catch (error) {
        console.error('Error uploading front image:', error); // ❌ If there's an error
      }
    };

    // Get the front image and username from localStorage
    const imageData = localStorage.getItem('frontImage');
    const username = localStorage.getItem('username');

    // Only upload if both exist
    if (imageData && username) {
      uploadFrontImage(imageData, username);
    } else {
      console.warn('Missing image or username in localStorage');
    }
  }, []);

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
