import avatar from "../../assets/img/user.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePerfil from "../../hooks/usePerfil";
import formatearFecha from "../../helpers/formatofecha";

function PerfilPage() {
  const { user } = useAuth();
  const {
    User,
    counters,
    publics,
    page,
    newPage,
    lastPage,
    deletePublication,
  } = usePerfil();
  return (
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
          <h2 className="mb-0 text-primary fw-semibold">
            {User.name} {User.surname}
          </h2>
          <p className="text-primary">@{User.nick}</p>

          <p className="mb-3 text-primary">{User.bio}</p>
          <div className="row">
            <div className="col-md-4">
              <Link
                to={`/social/siguindo/${User._id}`}
                className="text-decoration-none text-primary"
              >
                <strong className="d-block mb-1">
                  Seguidos:{" "}
                  <span className="text-center">{counters.following}</span>
                </strong>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to={`/social/segidores/${User._id}`}
                className="text-decoration-none text-primary"
              >
                <strong className="d-block mb-1">
                  Seguidores:{" "}
                  <span className="text-center">{counters.followed}</span>
                </strong>
              </Link>
            </div>
            <div className="col-md-4">
              <Link className="text-decoration-none text-primary ">
                <strong className="d-block mb-1">
                  Publicaciones:{" "}
                  <span className="text-center">{counters.publications}</span>
                </strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-3">
          <h1 className="text-center mb-4 display-4 fw-bold text-primary">
            Publicaciones de {User.name} {User.nick}
          </h1>
        </div>
      </div>
      {publics.map((publicacion) => (
        <div className="row" key={publicacion._id}>
          <div className="col-md-3">
            <img
              src={avatar}
              className="rounded-circle mb-3"
              alt="Imagen de Usuario"
              width="64"
              height="64"
            />
            <p className="text-muted mt-4">
              {formatearFecha(publicacion.created_at)}
            </p>
          </div>
          <div className="col-md-9">
            <div className="card mb-3">
              <div className="card-body d-flex flex-column ">
                <h5 className="card-title">
                  {publicacion.user.name} {publicacion.user.surname}
                </h5>
                <p className="card-text">{publicacion.text}</p>

                <div className="d-flex justify-content-center align-items-center">
                  {publicacion.file && (
                    <img
                      src={`http://localhost:4100/api/public/publication/${publicacion.file}`}
                      alt=""
                      className="img-fluid"
                      style={{
                        Width: "350px",
                        Height: "350px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-auto align-self-end"
                  onClick={() => deletePublication(publicacion._id)}
                >
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="row text-center my-5">
        <div className="col-md-12 mt-3 text-center">
          <button type="button" className="btn btn-primary" onClick={lastPage}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={newPage}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilPage;
