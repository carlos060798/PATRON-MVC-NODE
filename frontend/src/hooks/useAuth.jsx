// hook que provee la funcion del provider

import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthContext");
    }
    
    return context;
}

export default useAuth;