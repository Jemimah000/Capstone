import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}  // Ensure correct path
    >
      <div className="flex space-x-20">
        <button
          onClick={() => navigate("/login")}
          className="px-20 py-8 text-2xl font-[Playfair_Display] text-white bg-[rgba(255,255,255,0.2)] border border-white backdrop-blur-md rounded-xl transition duration-300 hover:text-black hover:bg-[rgba(255,255,255,0.4)] shadow-lg"
        >
          LOGIN
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-20 py-8 text-2xl font-[Playfair_Display] text-white bg-[rgba(255,255,255,0.2)] border border-white backdrop-blur-md rounded-xl transition duration-300 hover:text-black hover:bg-[rgba(255,255,255,0.4)] shadow-lg"
        >
          SIGNUP
        </button>
      </div>
    </div>
  );
}
