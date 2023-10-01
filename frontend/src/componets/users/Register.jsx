import useForm from "../../hooks/useForm";
import Alerta from "../alertas/Alerta";

function Registro() {
 const  {  handleChange,
 handleRegistro,
 formData,
 alerta,
} = useForm({});
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Registro</h2>
                <form onSubmit={handleRegistro}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="surname" className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                    />

                  </div>
                  <div className="mb-3">
                    <label htmlFor="nick" className="form-label">
                      Nick
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nick"
                      name="nick"
                      value={formData.nick}
                      onChange={handleChange}
                    />
                  </div> 
                  <div className="mb-3">
                    <label htmlFor="nick" className="form-label">
                      Bio
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
              {alerta.msg && <Alerta alerta={alerta} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registro;
