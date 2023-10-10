import React from "react";
import avatar from "../../assets/img/USER.png";
import useAuth from "../../hooks/useAuth";
import useFollowed from "../../hooks/useFollowed";

function FollowersPage() {
 const { users,Perfil } = useFollowed();

  return (
    <div className="container mt-5">
           <h1 className="text-center mb-4 display-4 fw-bold text-primary">

        Personas  que siguen a {Perfil.name} {""}{Perfil.nick}
      </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
        {users.map((USER) => (
          <div
            className="col mb-4"
            key={USER._id}
          >
            <div className="card h-100 shadow">
              <div className="card-body d-flex align-items-center">
                {USER.image !== "image.png" ? (
                  <img
                    className="img-thumbnail rounded-circle me-3"
                    src={`http://localhost:4100/api/users/avatar/${USER.image}`}
                    alt="Avatar"
                    style={{ width: "60px", height: "60px" }}
                  />
                ) : (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="img-thumbnail rounded-circle me-3"
                    style={{ width: "60px", height: "60px" }}
                  />
                )}
                <div>
                  <h5 className="font-weight-bold mx-1">
                   Nombre de Usuario : {USER.name} {USER.surname}
                  </h5>
                  <p className="text-muted mx-1">
                    Se unió el {new Date(USER.create_at).toLocaleDateString()}
                  </p>
                  <p className="mb-3">Bio: {USER.bio}</p>
                </div>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowersPage;