import { Outlet } from "react-router-dom";
import HeaderPage from "./Header";

function LayautPrivate() {
    return ( <>
         {/*layaut*/}
            <HeaderPage/>
            {/*Contenido principal*/}
                <Outlet/>
            
            {/*Sidebar*/}
            <sabeNavbar/>
    </> );
}

export default LayautPrivate;