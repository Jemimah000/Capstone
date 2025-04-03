import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/login", formData);
      navigate("/mainpg");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-center bg-cover bg-[url('../public/background.jpg')]">
      <div className="w-80 h-auto flex flex-col items-center justify-center gap-y-4 px-6 py-4 text-white 
                      bg-[rgba(255,255,255,0.2)] border border-white backdrop-blur-md 
                      rounded-xl shadow-lg">
        
        {/* Login Heading */}
        <h1 className="text-2xl font-bold font-[Playfair_Display]">LOGIN</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Username Input */}
        <input 
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Password Input */}
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Login Button */}
        <button 
          onClick={handleSubmit}
          className="w-full mt-2 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition"
        >
          Login
        </button>

        {/* Forgot Password */}
        <p className="text-sm text-white mt-2 cursor-pointer hover:underline">
          Forgot Password?
        </p>
      </div>
    </div>
  );
}
