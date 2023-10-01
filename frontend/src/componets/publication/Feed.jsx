import avatar from "../../assets/img/user.png";

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

function FeedPage() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([
    {
      id: 1,
      username: "Usuario1",
      time: "Hace 1 hora",
      text: "Este es un tweet de ejemplo 1.",
      isFollowed: false,
    },
    {
      id: 2,
      username: "Usuario2",
      time: "Hace 2 horas",
      text: "Este es un tweet de ejemplo 2.",
      isFollowed: true,
    },
  ]);

  const handleToggleFollow = (id) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === id) {
        return { ...tweet, isFollowed: !tweet.isFollowed };
      }
      return tweet;
    });
    setTweets(updatedTweets);
  };

  const handleLoadMore = () => {
    // Implementa lógica para cargar más tweets si es necesario
  };

  return (
   <>
   
   <div className="container mt-4">
      <h1>GENTE</h1>
      <div className="card mb-3 d-flex p-4">
        <div className="d-flex align-items-center mr-3">
          <img src={avatar} className="rounded-circle mx-2" alt="Imagen de Usuario" width="64" height="64" />
          <p className="text-muted mt-4 mx-1">Hace 1 hora</p>
        </div>
        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mt-0">Usuario1</h5>
              <p>Este es un tweet de ejemplo 1.</p>
            </div>
            <div className="d-flex">
              <button type="button" className="btn btn-danger btn-sm mx-2">
              <i className="fas fa-trash-alt"></i> Eliminar
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button type="button" className="btn btn-primary">
          Ver más publicaciones
        </button>
      </div>
    </div>
   </>
  );
}

export default FeedPage;










