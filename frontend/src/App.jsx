import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/loginsignup";
import Login from "./pages/login";
import Signup from "./pages/signup";
import './App.css';
import NamePage from "./pages/name";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/loginsignup" element={<LoginSignup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/name" element={<NamePage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
