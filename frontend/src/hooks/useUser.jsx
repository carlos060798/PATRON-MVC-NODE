import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function useUser() {
  const [users, setUser] = useState([]); // Estado para almacenar la lista de usuarios.
  const [page, setPage] = useState(1); // Estado para el número de página actual.
  const [following, setFollowing] = useState([]); // Estado para almacenar los usuarios seguidos por el usuario actual.
  let token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage.

  // Efecto secundario para cargar la lista de usuarios cuando el componente se monta.
  useEffect(() => {
    getUser(1); // Obtiene la lista de usuarios de la primera página.
  }, []);

  // Función para obtener la lista de usuarios.
  const getUser = async (pageid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Configura los encabezados con el token de autorización.
      },
    };
    const response = await axios.get(
      `http://localhost:4100/api/users/list/${pageid}`, // URL para obtener la lista de usuarios.
      config // Configuración de la solicitud con los encabezados.
    );
    const { data, status } = response;
    if (data.users && status === 200) {
      let newUsers = data.users;

      // Combina los nuevos usuarios con los usuarios existentes si ya hay usuarios cargados.
      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }

      setUser(newUsers); // Actualiza el estado 'users' con la lista de usuarios obtenida del servidor.
      setFollowing(data.userfollowings); // Actualiza el estado 'following' con los usuarios seguidos obtenidos del servidor.
      console.log({ users: newUsers, page: pageid });
    }
  };

  // Función para cargar la siguiente página de usuarios.
  const nextPage = () => {
    let nextPage = page + 1;
    setPage(nextPage);
    getUser(nextPage);

    console.log({ users: users, page: nextPage, following: following });
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

    // Manejar la respuesta del servidor
    const { data, status } = response;

    if (status === 200) {
      // Actualiza el estado 'following' con el nuevo usuario seguido.
      setFollowing([...following, userId]);
      console.log(data.user);
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

    // Manejar la respuesta del servidor
    const { data, status } = response;

    if (status === 200) {
      // Actualiza el estado 'following' eliminando el usuario que ya no se sigue.
      setFollowing(following.filter((follow) => follow !== userId));
      console.log(data.user);
    }
  };

  // Devuelve los estados y funciones necesarios para usar en el componente que importe este hook.
  return {
    users,
    getUser,
    nextPage,
    following,
    handleLike,
    handleDislike,
  };
}

export default useUser;