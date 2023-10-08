import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import getPerfil from "../helpers/getPerfil";

function usePerfil() {
    const [User, setUser] = useState({});
    const [counters, setCounters] = useState({
      following: "",
      followed: "",
      publications: "",
    });
    const [publics, setPublics] = useState([]);
    const [page, setPage] = useState(1);
    const { userId } = useParams();
    useEffect(() => {
        getPerfil(userId, setUser);
      getCounters();
      getPublications();
    }, []);
  
    useEffect(() => {
      getPerfil(userId, setUser);
      getPublications();
    }, [userId]);
  
    const getCounters = async () => {
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const request = await axios.get(
        `http://localhost:4100/api/users/counter/${userId}`,
        config
      );
      const { data, status } = request;
      const { following, followed, publications } = data;
      setCounters({ following, followed, publications });
    };
    const getPublications = async (nextPage = 1) => {
      try {
        let token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
    
        const request = await axios.get(
          `http://localhost:4100/api/public/user/${userId}/${nextPage}`,
          config
        );
    
        const { data, status } = request;
        if (status === 200) {
          // Siempre cargar solo las publicaciones de la página actual
          setPublics(data.publications);
        }
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        // Manejar el error y proporcionar retroalimentación al usuario si es necesario.
      }
     /* let token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const request = await axios.get(
        `http://localhost:4100/api/public/user/${userId}/${nextPage}`,
        config
      );
  
      const { data, status } = request;
      const { publications } = data;
      console.log(publications);
      setPublics(publications);
      if (status == 200) {
        let newPublications= publications;
  
        if(publics.length >= 1){
          newPublications = [...publics, ...newPublications];
        }
        setPublics(newPublications);
  
      }*/
    };
    const newPage = () => {
       let pagenext= page + 1;
      setPage(pagenext);
      getPublications(pagenext);
    }
  
    const deletePublication = async (id) => {
      try {
        let token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
    
        // Hacer la solicitud DELETE para eliminar la publicación
        await axios.delete(`http://localhost:4100/api/public/delete/${id}`, config);
    
        // Después de eliminar la publicación, cargar las nuevas publicaciones y actualizar los contadores
        getPublications();
        getCounters();
      } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        // Manejar el error y proporcionar retroalimentación al usuario si es necesario.
      }
      };
  
 return{
    User,
    counters,
    publics,
    page,
    newPage,
    deletePublication,
 }
}

export default usePerfil;