

import avatar from '../../../assets/img/user.png';
function NavbarPage() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h1 className="fw-bold m">Clon De X</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-home"></i> Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-list"></i> Timeline
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-user"></i> Gente
              </a>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse justify-content-center align-items-center" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src={avatar}
                  alt="Imagen de perfil"
                  className="avatar-img img-fluid"
                  style={{ width: "24px", height: "24px" }}
                />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span className="nick-name">Nick Name:</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-cog"></i> Ajustes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPage;

