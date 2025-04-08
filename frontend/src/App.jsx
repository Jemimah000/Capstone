import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/loginsignup";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import './App.css';
import NamePage from "./pages/name";
import FrontView from "./pages/frontView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/loginsignup" element={<LoginSignup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/name" element={<NamePage/>}/>
        <Route path="/frontview" element={<FrontView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
