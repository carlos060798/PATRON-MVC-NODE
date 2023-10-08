import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderPage from "./Header";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../alertas/spiner";

function LayautPrivate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        {" "}
        <HeaderPage />
       < Spinner />
      </>
    );
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

