import { Outlet } from "react-router-dom";
import HeaderPublicPage from "./HeaderPulic";
import useAuth from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
function LayautPublic() {
  const { user } = useAuth();

  return (
    <>
      {/*layaut*/}
      <HeaderPublicPage />
      {/*Contenido principal*/}
      <section className="layaut__content">
        {!user._id ? <Outlet /> : <Navigate to="/social" />}
      </section>
    </>
  );
}

export default LayautPublic;
