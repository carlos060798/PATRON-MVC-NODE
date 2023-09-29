// contexto para el login de usuario logeado

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    autUser();
  }, []);

  const autUser = async () => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      return;
    }

    // Convertir la cadena de texto del usuario de localStorage en un objeto
    const userObj = JSON.parse(userString);
    const userId = userObj._id;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:4100/api/users/profile/${userId}`,
        config
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user,setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
