import React, { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const checkAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signIn = async (username, password) => {
    try {
      await Auth.signIn(username, password);
      setIsAuthenticated(true);
      setError("");
      return true;
    } catch (err) {
      setError(err.message || "Failed to sign in");
      return false;
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        error,
        signIn,
        signOut,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
