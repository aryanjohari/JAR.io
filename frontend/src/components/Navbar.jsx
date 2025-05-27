import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, signIn, signOut, error, setError } =
    useContext(AuthContext);
  const [showSignIn, setShowSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const success = await signIn(username, password);
    if (success) {
      setShowSignIn(false);
      setUsername("");
      setPassword("");
      navigate("/scrapbook");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">JAR.io</h1>
        <div className="space-x-4 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-dusky font-bold" : "text-dusky hover:text-black"
            }
          >
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/scrapbook"
                className={({ isActive }) =>
                  isActive
                    ? "text-dusky font-bold"
                    : "text-dusky hover:text-black"
                }
              >
                Scrapbook
              </NavLink>
              <NavLink
                to="/map"
                className={({ isActive }) =>
                  isActive
                    ? "text-dusky font-bold"
                    : "text-dusky hover:text-black"
                }
              >
                Map
              </NavLink>
              <NavLink
                to="/companion"
                className={({ isActive }) =>
                  isActive
                    ? "text-dusky font-bold"
                    : "text-dusky hover:text-black"
                }
              >
                Companion
              </NavLink>
              <button
                onClick={handleSignOut}
                className="text-dusky hover:text-black"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="text-dusky hover:text-black"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      {showSignIn && !isAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-2xl font-bold text-black mb-4">Sign In</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-dusky mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full p-2 border border-dusky rounded text-dusky"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-dusky mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-2 border border-dusky rounded text-dusky"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-dusky text-white px-4 py-2 rounded hover:bg-black transition"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSignIn(false);
                    setError("");
                  }}
                  className="text-dusky hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
