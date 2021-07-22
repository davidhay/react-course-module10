import React, { useState, useEffect } from "react";

const IS_LOGGED_IN = "isLoggedIn";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {
    //helps with IDE autocomplete
    console.log("placeholder onLogout called");
  },
  onLogin: () => {
    //helps with IDE autocomplete
    console.log("placeholder onLogin called");
  },
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem(IS_LOGGED_IN);
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem(IS_LOGGED_IN, "1"); //both have to be strings
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedUserLoggedInInformation =
      localStorage.getItem(IS_LOGGED_IN) === "1";

    if (storedUserLoggedInInformation) {
      setIsLoggedIn(true);
    }
  }, []); //no deps also includes app start;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
