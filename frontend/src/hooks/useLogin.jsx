import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alerta, setAlerta] = useState({}); // Estado para mostrar la alerta
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,                          
    }));
  };
 /* const handleLogin = async (e) => {
    e.preventDefault();
    let userData = FormData;
    // Validar que no falten campos
    if ([FormData.email, FormData.password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Enviar los datos al backend
    try {
      const res = await axios.post(
        "http://localhost:4100/api/users/login",
        userData
      );
      const { data } = res;
      console.log(data);
      //  guardar token en el localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userexist));

      // Si todo sale bien, redireccionar al usuario
      setTimeout(() => {
        window.location.href = "/social";

      }, 3000);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error,
        error: true,
      });
    }
  }; */
  const handleLogin = async (e) => {
    e.preventDefault();
    let userData = FormData;
  
    // Validar que no falten campos
    if ([FormData.email, FormData.password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
  
    // Enviar los datos al backend
    try {
      const res = await axios.post(
        "http://localhost:4100/api/users/login",
        userData
      );
      const { data } = res;
  
      // Guardar token en el localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userexist));
  
      // Mostrar alerta de éxito
      setAlerta({
        msg: "Usuario logeado correctamente",
        error: false,
      });
  
      // Redireccionar al usuario después de 5 segundos
      setTimeout(() => {
        window.location.href = "/social";
      }, 5000);
    } catch (error) {
      console.log(error);
      // Mostrar alerta de error
      setAlerta({
        msg: "Usuario o contraseña incorrectos",
        error: true,
      });
    }
  };
  return {
    handleChange,
    FormData,
    alerta,
    handleLogin,
  };
};

export default useLogin;
