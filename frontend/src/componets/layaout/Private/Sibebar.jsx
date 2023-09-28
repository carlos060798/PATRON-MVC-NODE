import avatar from "../../../assets/img/user.png";
function SibeNavar() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="row">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={avatar}
                alt="avatar"
                className="img-thumbnail mb-3"
                style={{ width: "150px", height: "150px" }}
              />
              <h5 className="card-title">TuNombreDeUsuario</h5>
              <p className="card-text">Seguidores: 1000</p>
              <p className="card-text">Seguidos: 500</p>
              <p className="card-text">Total de publicaciones: 50</p>
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

export default SibeNavar;
