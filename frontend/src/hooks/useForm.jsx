import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";

function useForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nick: "",
    email: "",
    password: "",
  });
  const redireccion = useNavigate();

  const [alerta, setAlerta] = useState({}); // Estado para mostrar la alerta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Validar que no falten campos
    if (
      [
        formData.name,
        formData.surname,
        formData.nick,
        formData.email,
        formData.password,
      ].includes("")
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    console.log(formData);

    try {
      // 1. Llamar a la API para crear el usuario
      const usuarioResponse = await axios.post(
        "http://localhost:4100/api/users",
        formData
      );
      const { data } = usuarioResponse;
      console.log(data);
      // Mostrar alerta de éxito
      setAlerta({
        msg: data.message,
        error: false,
      });
      // Limpiar formulario y redirigir después de 10 segundos
      setTimeout(() => {
        setFormData({
          name: "", // Corregir el nombre del campo a "name"
          email: "",
          password: "",
        });
        redireccion("/");
      }, 5000);
    } catch (error) {
      console.error("Error al Registrarse:", error);
      // Mostrar alerta de error
      setTimeout(() => {
        setAlerta({
          msg: error.response.data, // Acceder al mensaje de error
          error: true,
        });
      }, 3000);
    }
  };

  return {
    handleChange,
    handleRegistro,
    formData,
    alerta,
  };
}

export default useForm;

/*import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
function useForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nick: "",
    email: "",
    password: "",
  });
  const redireccion = useNavigate();

  const [alerta, setAlerta] = useState({}); // Estado para mostrar la alerta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Validar que no falten campos
    if (
      [
        FormData.name,
        FormData.surname,
        FormData.nick,
        FormData.email,
        FormData.password,
      ].includes("")
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    console.log(formData);

    try {
      // 1. Llamar a la API para crear el usuario
      const usuarioResponse = await axios.post(
        "http://localhost:4100/api/users",
        formData
      );
      const { data } = usuarioResponse;
      console.log(data);
      // Mostrar alerta de éxito
      setAlerta({
        msg: data.message,
        error: false,
      });
      // Limpiar formulario y redirigir después de 10 segundos
      setTimeout(() => {
        setFormData({
          nombre: "",
          email: "",
          password: "",
        });
        redireccion("/");
      }, 5000);
    } catch (error) {
      console.error("Error al Registrarse:", error);
      // Mostrar alerta de error
      setTimeout(() => {
        setAlerta({
          msg: error.response,
          error: true,
        });
      }, 3000);
    }
  };

  return {
    handleChange,
    handleRegistro,
    formData,
    alerta,
  };
}

export default useForm;
*/