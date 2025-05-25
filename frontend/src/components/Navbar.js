import { Link } from "react-router-dom";

function Navbar() {
  // TODO: Replace with actual auth state (Step 7)
  const isAuthenticated = false; // Temporary placeholder

  return (
    <nav className="bg-sakshi-pink p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          JAR.io
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/chat" className="text-white hover:text-gray-200">
                Chat
              </Link>
              <Link to="/map" className="text-white hover:text-gray-200">
                Memory Map
              </Link>
              <Link to="/chatbot" className="text-white hover:text-gray-200">
                LoveBot
              </Link>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
