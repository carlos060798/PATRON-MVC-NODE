import React from "react";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";

function SideNavbar() {
  const { user,counter } = useAuth();
  console.log(counter);  

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="row">
          <div className="card">
            <div className="card-body text-center">
              {user.image !== "image.png" ? (
                <img
                  className="img-thumbnail mb-3"
                  style={{ width: "150px", height: "150px" }}
                  src={`http://localhost:4100/api/users/avatar/${user.image}`}
                  alt="Avatar"
                />
              ) : (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="img-thumbnail mb-3"
                  style={{ width: "150px", height: "150px" }}
                />
              )}

              <h5 className="card-title">{user.name} {user.surname}</h5>
              <p className="card-text">{user.nick}</p>
              <p className="card-text">Seguidores:{counter.following}</p>
              <p className="card-text">Seguidos: {counter.followed}</p>
              <p className="card-text">Publicaciones: { counter.publications}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="¿Qué estás pensando?"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUpload" className="form-label">
                    Subir imagen
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    accept="image/*"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Publicar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
