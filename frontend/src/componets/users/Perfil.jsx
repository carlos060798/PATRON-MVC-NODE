import { useEffect, useState } from "react";
import avatar from "../../assets/img/USER.png";
import getPerfil from "../../helpers/getPerfil";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function PerfilPage() {
  const [user,setUser] = useState({});
  const [counters, setCounters] = useState({
    following: 0,
    followed: 0,
    publications: 0
  });
  const {userId}=useParams();
   
useEffect(() => {
        getPerfil(userId,setUser);
        getCounters();
    },[]);

  
    const getCounters= async()=>{
    let  token=localStorage.getItem("token");
      const  config={
        headers:{
          "Content-Type":"application/json",
          Authorization:token
        }
      }
     const request= await axios.get(`http://localhost:4100/api/users/counter/${userId}`,config);
      console.log(request.data);
      const {data,status} = request
      const { following, followed, publications } = data;
      setCounters({ following, followed, publications });
       
    }

return ( <>
       <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
        {user.image !== "image.png" ? (
                      <img
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: "150px", height: "150px" }}
                        src={`http://localhost:4100/api/users/avatar/${user.image}`}
                        alt="Avatar"
                      />
                    ) : (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: "150px", height: "150px" }}
                      />
                    )}
        </div>
        <div className="col-md-9">
          <h2>  <Link to={`perfil/${user._id}`} className="text-muted">
              {user.name} {user.surname}
            </Link></h2>
          <p className="text-muted">@{user.nick}</p>

          <p>{user.bio}</p>
          <div className="row">
          <div className="col-md-4">
          <Link to={`/social/siguindo/${user._id}`}>
              <strong>Seguidores</strong><br /> {counters.following}{" "}</Link>
            </div>
            </div>
            <div className="col-md-4">
            <Link to={`/social/segidores/${user._id}`}>
              <strong>Seguidos</strong><br /> {counters.followed}
              </Link>
            </div>
            <div className="col-md-4">
            <Link to={`/social/feed`}> 
              <strong>Publicaciones</strong><br />{counters.publications}
              </Link>
            </div>
          </div>
          <button className="btn btn-primary mr-3">Seguir</button>
        </div>
      
      <div className="row">
      <h1>GENTE</h1>
      <div className="card mb-3 d-flex p-4">
        <div className="d-flex align-items-center mr-3">
          <img src={avatar} className="rounded-circle mx-2" alt="Imagen de Usuario" width="64" height="64" />
          <p className="text-muted mt-4 mx-1">Hace 1 hora</p>
        </div>
        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mt-0">Usuario1</h5>
              <p>Este es un tweet de ejemplo 1.</p>
            </div>
            <div className="d-flex">
              <button type="button" className="btn btn-danger btn-sm mx-2">
              <i className="fas fa-trash-alt"></i> Eliminar
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button type="button" className="btn btn-primary">
          Ver más publicaciones
        </button>
      </div>
      </div>
    </div>
    </> );
}

export default PerfilPage;