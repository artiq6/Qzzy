import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthService from '../services/auth.service'
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/failure.css';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.access_token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        AuthService.logout();
        toast("Sesja wygasła",{
            theme: "failure",
            onClose:(event) => window.location.href = '/'
        })
      }
    }
  }, [location]);

  return ;
};

export default AuthVerify;