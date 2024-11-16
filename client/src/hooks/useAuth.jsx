import Cookies from "js-cookie";
import { useState } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState({
    token: Cookies.get("token"),
  });

  const saveAuth = (token) => {
    Cookies.set("token", token);
    setAuth({ token });
  };

  const clearAuth = () => {
    Cookies.remove("token");
    setAuth({ token: null });
  };

  return { auth, saveAuth, clearAuth };
};
