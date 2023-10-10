import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import getPerfil from "../helpers/getPerfil";

function usePerfil() {
  const [User, setUser] = useState({}); // Estado para almacenar los datos del usuario.
  const [counters, setCounters] = useState({ // Estado para almacenar los contadores del usuario (seguidos, seguidores, publicaciones).
      following: "",
      followed: "",
      publications: "",
  });
  const [publics, setPublics] = useState([]); // Estado para almacenar las publicaciones del usuario.
  const [page, setPage] = useState(1); // Estado para el número de página actual de las publicaciones.
  const { userId } = useParams(); // Obtiene el ID de usuario de los parámetros de la URL.

  // Efecto secundario para cargar los datos del usuario y las publicaciones cuando el componente se monta o cuando el ID de usuario cambia.
  useEffect(() => {
      getPerfil(userId, setUser); // Obtiene los datos del perfil del usuario.
      getCounters(); // Obtiene los contadores del usuario (seguidos, seguidores, publicaciones).
      getPublications(); // Obtiene las publicaciones del usuario.
  }, [userId]);

  // Función para obtener los contadores del usuario.
  const getCounters = async () => {
      let token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage.
      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: token, // Configura los encabezados con el token de autorización.
          },
      };

      // Realiza una solicitud GET para obtener los contadores del usuario.
      const request = await axios.get(
          `http://localhost:4100/api/users/counter/${userId}`, // URL para obtener los contadores.
          config // Configuración de la solicitud con los encabezados.
      );

      // Maneja la respuesta del servidor.
      const { data, status } = request;
      const { following, followed, publications } = data;
      setCounters({ following, followed, publications }); // Actualiza el estado 'counters' con los datos obtenidos del servidor.
  };

  // Función para obtener las publicaciones del usuario.
  const getPublications = async (nextPage = 1) => {
      try {
          let token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage.
          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: token, // Configura los encabezados con el token de autorización.
              },
          };

          // Realiza una solicitud GET para obtener las publicaciones del usuario.
          const request = await axios.get(
              `http://localhost:4100/api/public/user/${userId}/${nextPage}`, // URL para obtener las publicaciones.
              config // Configuración de la solicitud con los encabezados.
          );

          // Maneja la respuesta del servidor.
          const { data, status } = request;
          if (status === 200) {
              // Siempre cargar solo las publicaciones de la página actual.
              setPublics(data.publications); // Actualiza el estado 'publics' con las publicaciones obtenidas del servidor.
          }
      } catch (error) {
          console.error("Error al obtener las publicaciones:", error);
          // Manejar el error y proporcionar retroalimentación al usuario si es necesario.
      }
  };

  // Función para cargar la siguiente página de publicaciones.
  const newPage = () => {
      let pagenext = page + 1;
      setPage(pagenext);
      getPublications(pagenext);
  };

  // Función para cargar la página anterior de publicaciones.
  const lastPage = () => {
      let pagenext = page - 1;
      setPage(pagenext);
      getPublications(pagenext);
  };

  // Función para eliminar una publicación.
  const deletePublication = async (id) => {
      try {
          let token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage.
          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: token, // Configura los encabezados con el token de autorización.
              },
          };

          // Realiza una solicitud DELETE para eliminar la publicación.
          await axios.delete(`http://localhost:4100/api/public/delete/${id}`, config);

          // Después de eliminar la publicación, cargar las nuevas publicaciones y actualizar los contadores.
          getPublications();
          getCounters();
      } catch (error) {
          console.error("Error al eliminar la publicación:", error);
          // Manejar el error y proporcionar retroalimentación al usuario si es necesario.
      }
  };

  // Devuelve los estados y funciones necesarios para usar en el componente que importe este hook.
  return {
      User,
      counters,
      publics,
      page,
      newPage,
      deletePublication,
      lastPage,
  };
}

export default usePerfil; 