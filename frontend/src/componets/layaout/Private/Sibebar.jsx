// deudas mejora la limpiada del formulario de publicaciones
// mejorar los contadores sean mas limpios  y se actualizen del todo

import React, { useState } from "react";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import usePublication from "../../../hooks/usePublication";

function SideNavbar() {
  const { user, counter } = useAuth();
  const { formData, handleChange, CreatePublication } = usePublication();

  return (
    <div className="container mt-4">
      <div className="row">
      <div className="row">
        <div className="col-md-3 text-center">
          {user.image !== "image.png" ? (
            <img
              className="img-fluid rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
              src={`http://localhost:4100/api/users/avatar/${user.image}`}
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
            <Link to={`perfil/${user._id}`} className="text-muted">
              {user.name} {user.surname}
            </Link>
          </h2>
          <p className="text-muted">@{user.nick}</p>
          <p>{user.bio}</p>
          <div className="row">
            <div className="col-md-4">
              <Link to={`/social/siguindo/${user._id}`}>
              <strong>Seguidores</strong><br /> {counter.following}{" "}</Link>
            </div>
            <div className="col-md-4">
            <Link to={`/social/segidores/${user._id}`}>
              <strong>Seguidos</strong><br /> {counter.followed}
              </Link>
            </div>
            <div className="col-md-4">
            <Link to={`/social/feed`}> 
              <strong>Publicaciones</strong><br />{counter.publications}
              </Link>
            </div>
          </div>
        </div>
      </div>
        

        <div className="row">
          <div className="card">
            <div className="card-body">
              <form id="publicationform" onSubmit={CreatePublication}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="¿Qué estás pensando?"
                    rows="3"
                    name="text"
                    value={formData.text || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="file0" className="form-label">
                    Subir imagen
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="form-control"
                    name="file0"
                    value={formData.file0}
                    onChange={handleChange}
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
