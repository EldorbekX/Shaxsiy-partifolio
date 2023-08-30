

import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { EXPIRE_DATE, TOKEN } from "../constants/index";

interface AuthContextState {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextState>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const checkTokenAvailability = () => {
  const token = Cookies.get(TOKEN);
  const expireDate = Number(Cookies.get(EXPIRE_DATE));
  if (token && expireDate >= Date.now()) {
    return true;
  }
  return false;
};

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    checkTokenAvailability()
  );

  useEffect(() => {
    const tokenAvailable = checkTokenAvailability();
    setIsAuthenticated(tokenAvailable);
  }, []); 

  const contextValue: AuthContextState = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
