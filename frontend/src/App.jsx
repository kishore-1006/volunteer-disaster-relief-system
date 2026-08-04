import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Volunteer from "./pages/Volunteer";
import Disaster from "./pages/Disaster";
import Shelter from "./pages/Shelter";
import Donation from "./pages/Donation";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/disaster" element={<Disaster />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;