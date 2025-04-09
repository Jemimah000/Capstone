import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/loginsignup");
  };

  return (
    <div className="background-container" onClick={handleClick}>
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="logo-container">
        <img src="/logo.png" alt="Aura Gaze Logo" className="logo" />
        <p className="aura-text">Aura Gaze</p>
        <p className="tagline">AI You Don’t Just Chat With — You Feel</p>
      </div>
    </div>
  );
};

export default Home;
