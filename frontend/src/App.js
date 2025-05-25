import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import TerminalChat from "./components/TerminalChat";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sakshi-pink">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center text-4xl font-bold text-white mt-10">
                Welcome to JAR.io, Sakshi!
              </h1>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<TerminalChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
