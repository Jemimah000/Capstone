import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-center bg-cover bg-[url('../public/background.jpg')]">
      <div className="w-80 h-auto flex flex-col items-center justify-center gap-y-4 px-6 py-4 text-white 
                      bg-[rgba(255,255,255,0.2)] border border-white backdrop-blur-md 
                      rounded-xl shadow-lg">
        
        {/* Signup Heading */}
        <h1 className="text-2xl font-bold font-[Playfair_Display]">
          SIGN UP
        </h1>

        {/* Email Input */}
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Username Input */}
        <input 
          type="text" 
          placeholder="Create Username" 
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Password Input */}
        <input 
          type="password" 
          placeholder="Create Password" 
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Retype Password Input */}
        <input 
          type="password" 
          placeholder="Retype Password" 
          className="w-full px-3 py-2 bg-transparent border-b border-white text-white outline-none"
        />

        {/* Signup Button */}
        <button className="w-full mt-2 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition">
          Sign Up
        </button>

        {/* Already have an account? */}
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
