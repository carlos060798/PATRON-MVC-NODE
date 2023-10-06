import avatar from "../../assets/img/user.png";

import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
function FeedPage() {
  const { user } = useAuth();
  const [publics, setPublics] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPublications();
  }, []);
  const getPublications = async (nextPage = 1) => {
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const request = await axios.get(
        `http://localhost:4100/api/public/feed/${nextPage}`,
        config
      );

      const { data, status } = request;
       const {publications} = data
       
      if (status === 200) {
        let newPubics= publications
         if (publications.length >= 1) {
          newPubics = [...publics, ...publications];
         }
        setPublics(newPubics);
      }
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      // Manejar el error y proporcionar retroalimentación al usuario si es necesario.
    }
  };
  const newPage = () => {
    let pagenext = page + 1;
    setPage(pagenext);
    getPublications(pagenext);
  };

  return (
    <>
      <div className="container mt-4">
        <h1>Publicaciones</h1>
        {publics.map((publicacion) => (
          <div className="card mb-3 d-flex p-4" key={publicacion._id}>
            <div className="d-flex align-items-center mr-3">
              <img
                src={avatar}
                className="rounded-circle mx-2"
                alt="Imagen de Usuario"
                width="64"
                height="64"
              />
              <p className="text-muted mt-4 mx-1">{publicacion.created_at}</p>
            </div>
            <div className="d-flex flex-column w-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mt-0">
                    {publicacion.user.name}
                    {publicacion.user.surname}
                  </h5>
                  <p>{publicacion.text}</p>
                  {publicacion.file && (
                    <img
                      src={`http://localhost:4100/api/public/publication/${publicacion.file}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="d-flex"></div>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-3">
          <button type="button" className="btn btn-primary" onClick={newPage}>
            Ver más publicaciones
          </button>
        </div>
      </div>
    </>
  );
}

export default FeedPage;
