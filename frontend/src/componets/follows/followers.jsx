/*import React from "react";
import avatar from "../../assets/img/USER.png";
import useAuth from "../../hooks/useAuth";
import useFollowed from "../../hooks/useFollowed";

function FollowersPage() {
    const {
        users,
        following,
        nextPage,
        handleLike,
        handleDislike,
        Perfil
      } = useFollowed();
    const {user}=useAuth();

    return (<>

  <div className="container mt-4">
      <h1>Usuarios que sigen a {Perfil.name}{Perfil.nick}</h1>
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
                    
    </>  );
}

export default FollowersPage;*/

import React from "react";
import avatar from "../../assets/img/USER.png";
import useAuth from "../../hooks/useAuth";
import useFollowed from "../../hooks/useFollowed";

function FollowersPage() {
    const {
        users,
        following,
        handleLike,
        handleDislike,
        Perfil
    } = useFollowed();
    const { user } = useAuth();

    return (
      <div className="container mt-5">
          <h1 className="text-center mb-4">Usuarios que siguen a {Perfil.name} {Perfil.nick}</h1>
          {users.map((USER) => (
              <div className="card mx-auto mb-4 p-3 col-12 col-md-10 col-lg-7" key={USER._id}>
                  <div className="d-flex align-items-center mb-3">
                      {USER.image !== "image.png" ? (
                          <img
                              className="img-thumbnail rounded-circle mr-3"
                              style={{ width: "60px", height: "60px" }}
                              src={`http://localhost:4100/api/users/avatar/${USER.image}`}
                              alt="Avatar"
                          />
                      ) : (
                          <img
                              src={avatar}
                              alt="Avatar"
                              className="img-thumbnail rounded-circle mr-3"
                              style={{ width: "60px", height: "60px" }}
                          />
                      )}
                      <div className="d-flex justify-content-between">
                          <h5 className="font-weight-bold mx-1">{USER.name} {USER.surname}</h5>
                          <p className="text-muted mx-1">Se unió el {new Date(USER.create_at).toLocaleDateString()}</p>
                          {USER._id !== user._id && (
            <div className="d-flex justify-content-between align-items-center mx-1">
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
                   
                  </div>
                  <p className="mb-3">{USER.bio}</p>
                
              </div>
          ))}
        
      </div>
  );
}

export default FollowersPage;