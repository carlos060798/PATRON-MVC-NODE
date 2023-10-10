import avatar from "../../assets/img/USER.png";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { uid as index } from "uid";
import formatearFecha from "../../helpers/formatofecha";
function PeoplePage() {
  const { user } = useAuth();
  const { users, nextPage, following, handleDislike, handleLike } = useUser();
  
  return (
    <div className="container mt-4">
       <h1 className="text-center mb-4 display-4 fw-bold text-primary">Usuarios de clon de x</h1>
      <div className="row">
        {users.map((USER) => (
          <div className="col-md-6 mb-4" key={index()}>
            <div className="card">
              <div className="card-body d-flex align-items-center">
                {USER.image !== "image.png" ? (
                  <img
                    className="img-thumbnail mr-3"
                    style={{ width: "34px", height: "34px" }}
                    src={`http://localhost:4100/api/users/avatar/${USER.image}`}
                    alt="Avatar"
                  />
                ) : (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="img-thumbnail mr-3"
                    style={{ width: "34px", height: "34px" }}
                  />
                )}
                <div>
                  <Link
                    to={`/social/perfil/${USER._id}`}
                    className="text-decoration-none"
                  >
                    <h5 className="card-title mb-1">
                      {USER.name} {USER.surname}
                    </h5>
                  </Link>
                  <p className="text-muted mb-1">
                    {formatearFecha(USER.create_at)}
                  </p>
                </div>
                {USER._id !== user._id && (
                  <div className="d-flex justify-content-between mx-2">
                    {!following.includes(USER._id) ? (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleLike(USER._id)}
                      >
                        <i className="fas fa-thumbs-up"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDislike(USER._id)}
                      >
                        <i className="fas fa-thumbs-down"></i>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="card-body">
                <p className="card-text">{USER.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center my-3">
        <button type="button" className="btn btn-primary" onClick={nextPage}>
          Ver más personas
        </button>
      </div>
    </div>
  );
}

export default PeoplePage;
