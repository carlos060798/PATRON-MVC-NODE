import { Outlet } from "react-router-dom";
import HeaderPage from "./Header";
import SideNavbar from "./Sibebar";

function LayautPrivate() {
  return (
    <>
      {/*layaut*/}
      <HeaderPage />
      {/*Contenido principal*/}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7">
            <Outlet />
          </div>
          <div className="col-md-5">
            {/*Sidebar*/}
            <SideNavbar />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayautPrivate;
