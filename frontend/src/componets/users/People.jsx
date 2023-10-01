import React, { useState } from "react";
import avatar from "../../assets/img/user.png";
import useUser from "../../hooks/useUser";

function PeoplePage() {
  const { users,nextPage } = useUser();

  return (
    <>
      <div className="container mt-4">
        <h1>GENTE</h1>
        {users.map((user) => (
          <div className="card mb-3 d-flex p-4" key={user._id}>
            <div className="d-flex align-items-center mr-3">
              {user.image !== "image.png" ? (
                <img
                  className="img-thumbnail mb-3"
                  style={{ width: "34px", height: "34px" }}
                  src={`http://localhost:4100/api/users/avatar/${user.image}`}
                  alt="Avatar"
                />
              ) : (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="img-thumbnail mb-3"
                  style={{ width: "34px", height: "34px" }}
                />
              )}
              <h5 className="mt-4">
                {user.name}
                {user.surname}
              </h5>
              <p className="text-muted mt-4 mx-1">{user.create_at}</p>
            </div>
            <div className="d-flex flex-column w-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p>{user.bio}</p>
                </div>
                <div className="d-flex">
                  <button type="button" className="btn btn-primary btn-sm mx-2">
                    <i className="fas fa-thumbs-up"></i> Like
                  </button>
                  <button type="button" className="btn btn-danger btn-sm">
                    <i className="fas fa-thumbs-down"></i> Dislike
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-3">
          <button type="button" className="btn btn-primary" onClick={nextPage}>
            Ver más personas
          </button>
        </div>
      </div>
    </>
  );
}

export default PeoplePage;
