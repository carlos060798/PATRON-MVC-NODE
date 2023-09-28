import { Outlet } from "react-router-dom";
import HeaderPage from "./Header";
import SibeNavar from "./sibebar";

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
            <SibeNavar />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayautPrivate;
