import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Scrapbook from "./components/Scrapbook";
import Map from "./components/Map";
import Companion from "./components/Companion";
import Home from "./components/Home";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading)
    return <div className="text-center text-dusky">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div className="min-h-screen bg-beige">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/scrapbook"
          element={
            <ProtectedRoute>
              <Scrapbook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companion"
          element={
            <ProtectedRoute>
              <Companion />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
