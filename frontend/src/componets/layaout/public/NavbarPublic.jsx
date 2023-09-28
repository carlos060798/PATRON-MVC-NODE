

import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link

function NavbarPublicPage() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h1 className="fw-bold">Clon De X</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              {/* Utiliza el componente Link para las rutas */}
              <Link to="/" className="nav-link">
                <i className="fas fa-user"></i> Login
              </Link>
            </li>
            <li className="nav-item">
              {/* Utiliza el componente Link para las rutas */}
              <Link to="/register" className="nav-link">
                <i className="fas fa-users"></i> Registro
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPublicPage;

