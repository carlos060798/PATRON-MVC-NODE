import { NavLink } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
function NavbarPage() {
  const { user } = useAuth();

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
              <NavLink to="/social" className="nav-link">
                <i className="fas fa-home"></i> Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/social/feed" className="nav-link">
                <i className="fas fa-list"></i> Timeline
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/social/gente" className="nav-link">
                <i className="fas fa-user"></i> Gente
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className="collapse navbar-collapse justify-content-center align-items-center"
          id="navbarNav"
        >
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <NavLink className="nav-link">
                {user.image !== "image.png" ? (
                  <img
                    className="img-thumbnail mb-3"
                    style={{ width: "32px", height: "32px" }}
                    src={`http://localhost:4100/api/users/avatar/${user.image}`}
                    alt="Avatar"
                  />
                ) : (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="img-thumbnail mb-3"
                    style={{ width: "32px", height: "32px" }}
                  />
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link">
                <span className="nick-name">
                  {user.name}
                  {user.surname}
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/social/settings" className="nav-link">
                <i className="fas fa-cog"></i> Ajustes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/social/logaut" className="nav-link">
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPage;
