import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/loginsignup";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import './App.css';
import NamePage from "./pages/name";
import FrontView from "./pages/frontView";
import LeftView from "./pages/leftView";
import RightView from "./pages/RightView";
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
        <Route path="/leftview" element={<LeftView/>}/>
        <Route path="/rightview" element={<RightView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
