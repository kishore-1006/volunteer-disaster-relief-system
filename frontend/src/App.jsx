import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ToastNotification from "./components/common/ToastNotification";
import ProtectedRoute from "./components/ProtectedRoute";
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
import NotFound from "./pages/NotFound";

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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/volunteer" element={<ProtectedRoute><Volunteer /></ProtectedRoute>} />
          <Route path="/disaster" element={<ProtectedRoute><Disaster /></ProtectedRoute>} />
          <Route path="/shelter" element={<ProtectedRoute><Shelter /></ProtectedRoute>} />
          <Route path="/donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;