export default function LoginSignup() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-[url('../public/background.jpg')]">
      <div className="flex space-x-16">
        <button className="px-26 py-16 text-2xl font-bold text-white bg-[rgba(255,255,255,0.2)] border border-white rounded-lg shadow-xl backdrop-blur-md transition-all duration-300 hover:text-black font-[Playfair_Display]">
          LOGIN
        </button>
        <button className="px-26 py-16 text-2xl font-bold text-white bg-[rgba(255,255,255,0.2)] border border-white rounded-lg shadow-xl backdrop-blur-md transition-all duration-300 hover:text-black font-[Playfair_Display]">
          SIGNUP
        </button>
      </div>
    </div>
  );
}
