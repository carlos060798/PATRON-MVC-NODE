import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import getPerfil from "../helpers/getPerfil";

function useFollowing() {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios que el usuario sigue.
  const [following, setFollowing] = useState([]); // Estado para almacenar los usuarios seguidos por el usuario.
  const [page, setPage] = useState(1); // Estado para el número de página de los usuarios seguidos.
  const { userId } = useParams(); // Obtiene el ID de usuario de los parámetros de la URL.
  const [Perfil, setPerfil] = useState({}); // Estado para almacenar el perfil del usuario actual.

  // Efecto secundario para cargar los usuarios seguidos y el perfil del usuario cuando el ID de usuario cambia.
  useEffect(() => {
      getFollowing(page); // Obtiene los usuarios seguidos por el usuario actual.
      getPerfil(userId, setPerfil); // Obtiene el perfil del usuario actual.

      // La dependencia 'userId' asegura que este efecto se ejecute cuando el ID de usuario cambia.
  }, [userId]);

  // Función para obtener los usuarios seguidos por el usuario actual.
  const getFollowing = async (pageid) => {
      try {
          let token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage.
          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: token, // Configura los encabezados con el token de autorización.
              },
          };

          // Realiza una solicitud GET para obtener los usuarios seguidos por el usuario actual.
          const response = await axios.get(
              `http://localhost:4100/api/follow/following/${userId}`, // URL para obtener los usuarios seguidos.
              config // Configuración de la solicitud con los encabezados.
          );

          // Maneja la respuesta del servidor.
          const { data, status } = response;

          // Filtra y almacena los usuarios seguidos por el usuario actual.
          let cleanUsers = [];
          response.data.users.forEach((user) =>
              cleanUsers = [...cleanUsers, user.followed]
          );

          data.users = cleanUsers;

          // Actualiza el estado 'users' y 'following' con los datos obtenidos del servidor.
          if (status === 200) {
              if (pageid === 1) {
                  setUsers(data.users);
              } else {
                  setUsers([...users, ...data.users]);
              }
              setFollowing(data.followings);
          }
      } catch (error) {
          // Manejar errores de la solicitud HTTP aquí
          console.error("Error fetching data: ", error);
      }
  };

  // Función para manejar el evento de "Me gusta" en un usuario.
  const handleLike = async (userId) => {
      const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage.

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: token, // Configura los encabezados con el token de autorización.
          },
      };

      const body = {
          followed: userId,
      };

      // Realiza una solicitud POST para indicar que el usuario actual sigue a otro usuario.
      const response = await axios.post(
          "http://localhost:4100/api/follow/save", // URL para guardar la relación de seguimiento.
          body, // Datos del cuerpo de la solicitud.
          config // Configuración de la solicitud con los encabezados.
      );

      // Manejar la respuesta del servidor.
      const { status } = response;

      if (status === 200) {
          // Actualiza el estado 'following' con el nuevo usuario seguido.
          setFollowing([...following, userId]);
      }
  };

  // Función para manejar el evento de "No me gusta" en un usuario seguido.
  const handleDislike = async (userId) => {
      const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage.

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: token, // Configura los encabezados con el token de autorización.
          },
      };

      // Realiza una solicitud DELETE para indicar que el usuario actual ya no sigue a otro usuario.
      const response = await axios.delete(`http://localhost:4100/api/follow/delete/${userId}`, config);

      // Manejar la respuesta del servidor.
      const { status } = response;

      if (status === 200) {
          // Actualiza el estado 'following' eliminando el usuario que ya no se sigue.
          setFollowing(following.filter((follow) => follow !== userId));
      }
  };

  // Devuelve los estados y funciones necesarios para usar en el componente que importe este hook.
  return {
      users,
      following,
      handleLike,
      handleDislike,
      Perfil,
  };
}

export default useFollowing; 
