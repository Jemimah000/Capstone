import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-center bg-cover bg-[url('../public/background.jpg')]">
      <div className="w-80 h-80 flex flex-col items-center justify-center gap-y-4 px-6 py-4 text-white bg-[rgba(255,255,255,0.2)] border border-white backdrop-blur-md rounded-xl shadow-lg">
        
        {/* Login Heading */}
        <h1 className="text-2xl font-bold font-[Playfair_Display]">LOGIN</h1>

        {/* Username Input */}
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Password Input */}
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Login Button */}
        <button className="w-full mt-2 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition">
          Login
        </button>

        {/* Forgot Password */}
        <a href="#" className="text-sm text-white mt-2 hover:underline">
          Forgot Password?
        </a>
        
      </div>
    </div>
  );
}
