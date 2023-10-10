import useForm from "../../hooks/useForm";
import Alerta from "../alertas/Alerta";
import { Link } from "react-router-dom";

function Registro() {
  const { handleChange, handleRegistro, formData, alerta } = useForm({});

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">
          <div className="card p-4">
            <h2 className="text-center mb-4">Registro</h2>
            <form onSubmit={handleRegistro}>
              <div className="row mb-3">
                <div className="col-lg-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nick"
                    name="nick"
                    value={formData.nick}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo Electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
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
              {alerta.msg && <Alerta alerta={alerta} />}
            </form>
            <p className="mt-3 text-center">
              ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
