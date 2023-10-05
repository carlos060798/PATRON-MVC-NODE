import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import getPerfil from "../../helpers/getPerfil";
import { Await, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function PerfilPage() {
  const { user } = useAuth();
  const [User, setUser] = useState({});
  const [counters, setCounters] = useState({
    following: "",
    followed: "",
    publications: "",
  });
  const [publics, setPublics] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    getPerfil(userId, setUser);
    getCounters();
    getPublications();
  }, []);

  useEffect(() => {
    getPerfil(userId, setUser);
    getPublications();
  }, [userId]);

  const getCounters = async () => {
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const request = await axios.get(
      `http://localhost:4100/api/users/counter/${userId}`,
      config
    );
    const { data, status } = request;
    const { following, followed, publications } = data;
    setCounters({ following, followed, publications });
  };
  const getPublications = async (nextPage = 1) => {
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const request = await axios.get(
      `http://localhost:4100/api/public/user/${userId}/${nextPage}`,
      config
    );

    const { data, status } = request;
    const { publications } = data;
    console.log(publications);
    setPublics(publications);

    if (status == 200) {
      setPublics(publications);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            {User.image !== "image.png" ? (
              <img
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
                src={`http://localhost:4100/api/users/avatar/${User.image}`}
                alt="Avatar"
              />
            ) : (
              <img
                src={avatar}
                alt="Avatar"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </div>
          <div className="col-md-9">
            <h2>
              {" "}
              <Link to={`perfil/${User._id}`} className="text-muted">
                {User.name} {User.surname}
              </Link>
            </h2>
            <p className="text-muted">@{user.nick}</p>

            <p>{User.bio}</p>
            <div className="row">
              <div className="col-md-4">
                <Link to={`/social/siguindo/${User._id}`}>
                  <strong>Seguidores</strong>
                  <br /> {counters.following}{" "}
                </Link>
              </div>

              <div className="col-md-4">
                <Link to={`/social/segidores/${User._id}`}>
                  <strong>Seguidos</strong>
                  <br /> {counters.followed}
                </Link>
              </div>
              <div className="col-md-4">
                <Link>
                  <strong>Publicaciones</strong>
                  <br />
                  {counters.publications}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h1>GENTE</h1>
          {publics.map(
            (publicacion) => (
              console.log(publicacion),
              (
                <div className="card mb-3 d-flex p-4" key={publicacion._id}>
                  <div className="d-flex align-items-center mr-3">
                    <img
                      src={avatar}
                      className="rounded-circle mx-2"
                      alt="Imagen de Usuario"
                      width="64"
                      height="64"
                    />
                    <p className="text-muted mt-4 mx-1">
                      {publicacion.created_at}
                    </p>
                  </div>
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mt-0">
                          {publicacion.user.name}
                          {publicacion.user.surname}
                        </h5>
                        <p>{publicacion.text}</p>
                      </div>
                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm mx-2"
                        >
                          <i className="fas fa-trash-alt"></i> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-primary">
              Ver más publicaciones
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilPage;