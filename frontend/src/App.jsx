import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
