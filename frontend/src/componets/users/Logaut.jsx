import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function LogautClose() {
    const {setUser,setCounter }=useAuth();
    const navigate= useNavigate();
    useEffect(() => {
        setUser({});
        setCounter({});
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }, []);
    return (<> 
      <h1>Cerrar seccion ...</h1>
    </> );
}

export default LogautClose;