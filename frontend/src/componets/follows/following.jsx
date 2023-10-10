import React from "react";
import avatar from "../../assets/img/USER.png";
import useFollowing from "../../hooks/useFollowing";
import useAuth from "../../hooks/useAuth";
function FollowingPage() {
  const { users, Perfil } =
    useFollowing();
  const { user } = useAuth();
  console.log(users);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 display-4 fw-bold text-primary">
        Personas que sigue {Perfil.name} {""}
        {Perfil.nick}
      </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
        {users.map((USER) => (
          <div className="col mb-4" key={USER._id}>
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
                  <h5 className="font-weight-bold mb-1">
                    Nombre de usuario: {USER.name} {USER.surname}
                  </h5>
                  <p className="text-muted mb-1">
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

export default FollowingPage;