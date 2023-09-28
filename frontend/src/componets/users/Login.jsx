import React from 'react';

function Login() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">
                <i className="fas fa-user"></i> Login
              </h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Usuario</label>
                  <input type="text" className="form-control" id="username" placeholder="Nombre de usuario" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Contraseña" />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </div>
              </form>
              <div className="text-center mt-3">
                ¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;