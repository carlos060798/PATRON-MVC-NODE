import usePublication from "../../hooks/usePublication";
import avatar from "../../assets/img/user.png";

function FeedPage() {
const{
  formData,
  handleChange,
  CreatePublication,
  alert,
  publics,
  newPage,
}=usePublication();
return (
  <div className="container mt-4">
    <div className="col">
      <div className="row justify-content-center align-items-center">
        <div className="card col-lg-7 col-md-10 col-12">
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
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-pen"></i> Publicar
              </button>
            </form>
           
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
      <div className="row mt-4 justify-content-center">
        <div className="col-lg-7 col-md-10 col-12">
          <h1>Publicaciones</h1>
          {publics.map((publicacion) => (
            <div className="card mb-3" key={publicacion._id}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <img
                    src={avatar}
                    className="rounded-circle mr-3"
                    alt="Imagen de Usuario"
                    width="64"
                    height="64"
                  />
                  <div>
                    <h5 className="mt-0">
                      {publicacion.user.name} {publicacion.user.surname}
                    </h5>
                    <p>{publicacion.text}</p>
                    {publicacion.file && (
                      <img
                        src={`http://localhost:4100/api/public/publication/${publicacion.file}`}
                        alt=""
                        className="img-fluid"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={newPage}>
              Ver más publicaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default FeedPage;
