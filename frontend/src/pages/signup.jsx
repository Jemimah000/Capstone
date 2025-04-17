import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://ss-aura-gaze-1528.onrender.com/auth/signup", formData);
      localStorage.setItem("username", response.data.username);
      navigate("/name");

      navigate("/name");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-center bg-cover bg-[url('/background.jpg')]">
    <div className="w-80 h-auto flex flex-col items-center justify-center gap-y-4 px-6 py-4 text-white 
                    bg-[rgba(255,255,255,0.2)] border border-white backdrop-blur-md 
                    rounded-xl shadow-lg">

        {/* Signup Heading */}
        <h1 className="text-3xl font-bold font-[Playfair_Display]">SIGN UP</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Username Input */}
        <input
          type="text"
          name="username"
          placeholder="Create Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Retype Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Sign Up Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-2 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition"
        >
          Sign Up
        </button>

        {/* Already have an account */}
        <p
          className="text-sm text-white mt-2 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
