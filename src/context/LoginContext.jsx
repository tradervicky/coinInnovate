
import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);

  const updateLoginState = (isLoggedIn) => {
    setLoginState(isLoggedIn);
  };

  return (
    <LoginContext.Provider value={{ loginState, updateLoginState }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(LoginContext);
};
