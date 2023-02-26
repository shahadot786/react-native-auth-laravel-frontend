import React, {createContext, useState} from 'react';
import {getToken, getUserData, logout, removeToken} from '../auth/auth';


export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkLoginStatus = async () => {
    const token = await getToken();
    if (token) {
      setIsLoggedIn(true);
      // Set user data from API response or local storage
      const user = await getUserData(token);
      setUserData(user);
    }
  };

  const handleLogout = async () => {
    // Clear user data from context and local storage
    setIsLoggedIn(false);
    setUserData(null);
    // Remove token from local storage
    removeToken();
    await logout();
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        userData,
        checkLoginStatus,
        handleLogout,
      }}>
      {children}
    </LoginContext.Provider>
  );
};
