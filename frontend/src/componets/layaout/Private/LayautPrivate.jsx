import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderPage from "./Header";
import useAuth from "../../../hooks/useAuth";

function LayautPrivate() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1 className="text-center mt-5">Cargando...</h1>;
  } else {
    return (
      <>
        {/* Layout */}
        <HeaderPage />
        {/* Contenido principal */}
        <div className="container mt-4">
          <div className="row">
            {user._id ? (
              <>
                <div className="col-md-7">
                  <Outlet />
                </div>
                
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </div>
        </div>
      </>
    );
  }
}
export default LayautPrivate;

/*import { Outlet } from "react-router-dom";
import HeaderPage from "./Header";
import SideNavbar from "./Sibebar";

function LayautPrivate() {
  return (
    <>
      <HeaderPage />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7">
            <Outlet />
          </div>
          <div className="col-md-5">
            <SideNavbar />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayautPrivate;*/
