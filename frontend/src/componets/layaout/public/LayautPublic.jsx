import { Outlet } from "react-router-dom";
import HeaderPublicPage from "./HeaderPulic";

function LayautPublic() {
    return ( <>
         {/*layaut*/}
            <HeaderPublicPage/>
            {/*Contenido principal*/}
            <section className="layaut__content">
                <Outlet/>
            </section>
    </> );
}

export default LayautPublic;