import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AuthProvider=({children})=>{
  const [isLoggedIn, setIsLoggedIn]=useState(false);

  const login=()=>{
    setIsLoggedIn(true);
  }
  const logout=()=>{
    setIsLoggedIn(false);
  }

  const value = { isLoggedIn, login, logout };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };