import { useState } from "react";

export const useToken = () => {
  const getToken = () => {
    if (typeof window !== "undefined" && window?.sessionStorage) {
      const tokenString = sessionStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      return userToken;
    }
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if (window !== undefined && window?.sessionStorage) {
      sessionStorage.setItem("token", JSON.stringify(userToken));
      setToken(userToken);
    }
  };
  const clearToken = () => {
    if (window !== undefined && window?.sessionStorage) {
      sessionStorage.removeItem("token");
      setToken(null);
    }
  };

  return {
    setToken: saveToken,
    token,
    clearToken,
  };
};
export const useUser = () => {
  const getUser = () => {
    if (typeof window !== "undefined" && window?.sessionStorage) {
      const userSting = sessionStorage.getItem("user");
      const user = JSON.parse(userSting);
      return user;
    }
  };
  const [user, setUser] = useState(getUser());

  const saveUser = (user) => {
    if (window !== undefined && window?.sessionStorage) {
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  };
  const clearUser = () => {
    if (window !== undefined && window?.sessionStorage) {
      sessionStorage.removeItem("user");
      setUser(null);
    }
  };

  return {
    setUser: saveUser,
    user,
    clearUser,
  };
};
