import { useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const usePublication = () => {
  const [formData, setFormData] = useState({ text: "", file0: "" });
  const { user } = useAuth();
  const [alert, setAlert] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setFormData({ text: "", file0: "" });
  };
  const CreatePublication = async (e) => {
    try {
      e.preventDefault();

      const nuwData = {
        ...formData,
        user: user._id,
      };

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const request = await axios.post(
        "http://localhost:4100/api/public/save",
        nuwData,
        config
      );

      const { data, status } = request;
      const publicationId = data.publicationSaved._id;

      const fileInput = document.querySelector("#file");

      if (status === 200 && fileInput.files[0]) {
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);

        const config2 = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        };

        const responseImg = await axios.post(
          `http://localhost:4100/api/public/upload/${publicationId}`,
          formData,
          config2
        );

        if (responseImg.status === 200) {
          // Limpiar el formulario después de la publicación exitosa
          resetForm()

          // Mostrar una alerta de éxito
          setAlert({ type: "success", message: "Publicación creada con éxito" });
 
          // Limpiar la alerta después de 4 segundos
          setTimeout(() => {
            setAlert({ type: null, message: "" });
          }, 4000);
        } else {
          // Mostrar una alerta de error si la carga de la imagen falla
          setAlert({ type: "error", message: "Error al subir la imagen" });
        }
      } else {
        // Mostrar una alerta de éxito si no hay imagen para cargar
        setAlert({ type: "success", message: "Publicación creada con éxito" });

        // Limpiar la alerta después de 4 segundos
        setTimeout(() => {
          setAlert({ type: null, message: "" });
        }, 4000);
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);

      // Muestra una alerta de error
      setAlert({ type: "error", message: "Error al crear la publicación" });

      // Limpiar la alerta después de 4 segundos
      setTimeout(() => {
        setAlert({ type: null, message: "" });
      }, 4000);
    }
  };

  return { formData, handleChange, CreatePublication, alert };
};

export default usePublication; 


/*import { useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const usePublication = () => {
  const [formData, setFormData] = useState({ text: "", file0: "" });
  const { user } = useAuth();
  const [alert, setAlert] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const CreatePublication = async (e) => {
    try {
      e.preventDefault();

      const nuwData = {
        ...formData,
        user: user._id,
      };

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const request = await axios.post(
        "http://localhost:4100/api/public/save",
        nuwData,
        config
      );

      const { data, status } = request;
      const publicationId = data.publicationSaved._id;

      const fileInput = document.querySelector("#file");

      if (status === 200 && fileInput.files[0]) {
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);

        const config2 = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        };

        const responseImg = await axios.post(
          `http://localhost:4100/api/public/upload/${publicationId}`,
          formData,
          config2
        );

        if (responseImg.status === 200) {
          // Limpiar el formulario después de la publicación exitosa
          document.querySelector("#publicationform").reset();

          // Mostrar una alerta de éxito
          setAlert({ type: "success", message: "Publicación creada con éxito" });
        } else {
          // Mostrar una alerta de error si la carga de la imagen falla
          setAlert({ type: "error", message: "Error al subir la imagen" });
        }
      } else {
        // Mostrar una alerta de éxito si no hay imagen para cargar
        setAlert({ type: "success", message: "Publicación creada con éxito" });
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);
  
      // Muestra una alerta de error
      
      setAlert({ type: "error", message: "Error al crear la publicación" });
    }
  };

  return { formData, handleChange, CreatePublication, alert };
};

export default usePublication;*/