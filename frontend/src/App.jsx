import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ToastNotification from "./components/common/ToastNotification";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Volunteer from "./pages/Volunteer";
import Disaster from "./pages/Disaster";
import Shelter from "./pages/Shelter";
import Donation from "./pages/Donation";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ToastNotification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
    </AppProvider>
  );
}

export default App;