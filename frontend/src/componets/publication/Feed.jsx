import React from "react";
import usePublication from "../../hooks/usePublication";
import avatar from "../../assets/img/user.png";

function FeedPage() {
  const {
    formData,
    handleChange,
    CreatePublication,
    alert,
    publics,
    newPage,
    loading,
  } = usePublication();

  return (
    <div className="container mt-4">
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
            {loading && <div className="loading-indicator">Cargando...</div>}
            {alert.type === "success" && (
              <div className="alert alert-success mt-4" role="alert">
                {alert.message}
              </div>
            )}
            {alert.type === "error" && (
              <div className="alert alert-danger mt-4" role="alert">
                {alert.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Publicaciones</h1>
        {publics.map((publicacion) => (
          <div className="card mb-3 d-flex p-4" key={publicacion._id}>
            <div className="d-flex align-items-center mr-3">
              <img
                src={avatar}
                className="rounded-circle mx-2"
                alt="Imagen de Usuario"
                width="64"
                height="64"
              />
              <p className="text-muted mt-4 mx-1">{publicacion.created_at}</p>
            </div>
            <div className="d-flex flex-column w-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mt-0">
                    {publicacion.user.name} {publicacion.user.surname}
                  </h5>
                  <p>{publicacion.text}</p>
                  {publicacion.file && (
                    <img
                      src={`http://localhost:4100/api/public/publication/${publicacion.file}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="d-flex"></div>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-3">
          <button type="button" className="btn btn-primary" onClick={newPage}>
            Ver más publicaciones
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;