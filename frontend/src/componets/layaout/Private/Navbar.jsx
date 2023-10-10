import { NavLink } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
function NavbarPage() {
  const { user } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="fw-bold mb-0 ">Clon De X</h1>
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
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <NavLink to="/social" className="nav-link">
                  <i className="fas fa-home me-1"></i> Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`perfil/${user._id}`} className="nav-link">
                <i className="fas fa-user-circle me-1"></i>Perfil
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/social/gente" className="nav-link">
                  <i className="fas fa-user me-1"></i> Gente
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item me-3">
                {user.image !== "image.png" ? (
                  <img
                    className="img-thumbnail rounded-circle"
                    style={{ width: "32px", height: "32px" }}
                    src={`http://localhost:4100/api/users/avatar/${user.image}`}
                    alt="Avatar"
                  />
                ) : (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="img-thumbnail rounded-circle"
                    style={{ width: "32px", height: "32px" }}
                  />
                )}
              </li>
              <li className="nav-item me-3">
                <NavLink to={`perfil/${user._id}`} className="nav-link">
                  <span className="fw-bold">
                    {user.name} {user.surname}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink to="/social/settings" className="nav-link">
                  <i className="fas fa-cog me-1"></i> Ajustes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/social/logaut" className="nav-link text-danger">
                  <i className="fas fa-sign-out-alt me-1"></i> Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarPage;
