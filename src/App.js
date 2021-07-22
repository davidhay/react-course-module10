import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";

function App() {
  //we need state in react AND state in browser :-(
  const IS_LOGGED_IN = "isLoggedIn";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation =
      localStorage.getItem(IS_LOGGED_IN) === "1";

    if (storedUserLoggedInInformation) {
      setIsLoggedIn(true);
    }
  }, []); //no deps also includes app start;

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(IS_LOGGED_IN, "1"); //both have to be strings
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem(IS_LOGGED_IN);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
