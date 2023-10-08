import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const usePublication = () => {
  const [formData, setFormData] = useState({ text: "", file0: "" });
  const [alert, setAlert] = useState({ type: null, message: "" });
  const [publics, setPublics] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const  [hasMorePublications, setHasMorePublications] = useState(true); // Nuevo estado para controlar si hay más publicaciones
  const { user } = useAuth();


  useEffect(() => {
    getPublications();
  }, [page]);

  const getPublications = async () => {
    try {
      setLoading(true);
  
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
  
      const request = await axios.get(
        `http://localhost:4100/api/public/feed/${page}`,
        config
      );
  
      const { data, status } = request;
      const { publications } = data;
  
      if (status === 200) {
        if (page === 1) {
          // Si es la primera página, establece las publicaciones directamente
          setPublics(publications);
        } else {
          // Si no es la primera página, verifica si hay nuevas publicaciones
          if (publications.length === 0) {
            // No hay más publicaciones, desactiva la carga adicional
            setHasMorePublications(false);
          } else {
            // Hay nuevas publicaciones, agrégales a la lista existente
            setPublics((prevPublics) => [...prevPublics, ...publications]);
          }
        }
      }
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      // Manejar el error y proporcionar retroalimentación al usuario si es necesario.
    } finally {
      setLoading(false);
    }
  };

  const newPage = () => {
    let nextPage = page + 1;
    setPage(nextPage);
    getPublications(nextPage);
  };

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
      setLoading(true);
  
      const newData = {
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
        newData,
        config
      );
  
      const { data, status } = request;
      const publicationId = data.publicationSaved._id;
  
      if (status === 200) {
        const fileInput = document.querySelector("#file");
  
        if (fileInput && fileInput.files[0]) {
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
  
          if (responseImg.status !== 200) {
            // Mostrar una alerta de error si la carga de la imagen falla
            setAlert({ type: "error", message: "Error al subir la imagen" });
          }
        }
  
        // Limpiar el formulario después de la publicación exitosa
        resetForm();
  
        // Mostrar una alerta de éxito
        setAlert({ type: "success", message: "Publicación creada con éxito" });
  
        // Limpiar la alerta después de 4 segundos
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        // Mostrar una alerta de error si la publicación falla
        setAlert({ type: "error", message: "Error al crear la publicación" });
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      // Mostrar una alerta de error
      setAlert({ type: "error", message: "Error al crear la publicación" });
    } finally {
      setLoading(false);
    }
  };


  return { formData, handleChange, CreatePublication, alert, publics, newPage, loading,hasMorePublications };
};

export default usePublication;

