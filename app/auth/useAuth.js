import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import "core-js/stable/atob";

import {jwtDecode} from "jwt-decode";
import fire from "../firebase/functions";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    authStorage.removeToken("token");
    authStorage.removeToken("firebaseToken");
  };

  const login = (authToken, firebaseToken) => {
    fire.authenticate(authToken, firebaseToken, (a, b) => {
      const user = jwtDecode(a);
      setUser(user);
      authStorage.storeToken("token", a);
      authStorage.storeToken("firebaseToken", b);
    });
  };

  return { user, login, logout };
};

export default useAuth;
