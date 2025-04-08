import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NamePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Type a name for your Best Friend!");
      return;
    }

    try {
      // Optional: log to confirm submission
      console.log("Submitting name:", name);

      await axios.post("http://localhost:5004/auth/bestFriendName", { name });
      navigate("/frontView");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Form Box */}
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col items-center gap-y-4 px-7 py-7 text-white 
                  bg-[rgba(255,255,255,0.2)] border border-white backdrop-blur-md 
                  rounded-xl shadow-lg"
      >
        {/* Heading */}
        <h1 className="text-2xl font-bold font-[Playfair_Display] text-center">
          Give a name for your best friend
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none text-center"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition"
        >
          Create your best friend
        </button>
      </form>
    </div>
  );
}
