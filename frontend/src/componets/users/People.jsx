import React from "react";
import avatar from "../../assets/img/USER.png";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

function PeoplePage() {
  const { user } = useAuth();
  const { users, nextPage, following,handleDislike,handleLike } = useUser();

  return (
    <div className="container mt-4">
      <h1>GENTE</h1>
      {users.map((USER) => (
        <div className="card mb-3 d-flex p-4" key={USER._id}>
          <div className="d-flex align-items-center mr-3">
            {USER.image !== "image.png" ? (
              <img
                className="img-thumbnail mb-3"
                style={{ width: "34px", height: "34px" }}
                src={`http://localhost:4100/api/users/avatar/${USER.image}`}
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
              {USER.name} {USER.surname}
            </h5>
            <p className="text-muted mt-4 mx-1">{USER.create_at}</p>
          </div>
          <div className="d-flex flex-column w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p>{USER.bio}</p>
              </div>
              <div className="d-flex">
                {USER._id !== user._id && (
                  <>
                    {!following.includes(USER._id) ? (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => handleLike(USER._id)}
                      >
                        <i className="fas fa-thumbs-up"></i> Like
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDislike(USER._id)}
                      >
                        <i className="fas fa-thumbs-down"></i> Dislike
                      </button>
                    )}
                  </>
                )}
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
  );
}

export default PeoplePage;



/*import React, { useState } from "react";
import avatar from "../../assets/img/USER.png";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

function PeoplePage() {
 const {user}=useAuth()
  const { users, nextPage, following,handleLike,
    handleDislike
    } = useUser();

  return (
    <>
      <div className="container mt-4">
        <h1>GENTE</h1>
        {users.map((USER) => (
          <div className="card mb-3 d-flex p-4" key={USER._id}>
            <div className="d-flex align-items-center mr-3">
              {USER.image !== "image.png" ? (
                <img
                  className="img-thumbnail mb-3"
                  style={{ width: "34px", height: "34px" }}
                  src={`http://localhost:4100/api/USERs/avatar/${USER.image}`}
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
                {USER.name}
                {USER.surname}
              </h5>
              <p className="text-muted mt-4 mx-1">{USER.create_at}</p>
            </div>
            <div className="d-flex flex-column w-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p>{USER.bio}</p>
                </div>
                <div className="d-flex">
                 { USER._id != user._id 
                  {!following.includes(USER._id) ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mx-2"
                        onClick={() => handleLike(USER._id)}
                    >
                      <i className="fas fa-thumbs-up"></i> Like
                    </button>
                  ) : (
                    <button type="button" className="btn btn-danger btn-sm"
                     onClick={()=> handleDislike(USER._id) } >
                      <i className="fas fa-thumbs-down"></i> Dislike
                    </button>
                  )}
}
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
*/