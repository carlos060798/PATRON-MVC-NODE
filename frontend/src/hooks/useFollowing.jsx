import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import getPerfil from "../helpers/getPerfil";

function useFollowing() {
    const [users, setUser] = useState([]);
    const [following, setFollowing] = useState([]);
    const [page, setPage] = useState(1);
    const { userId } = useParams();
    const [Perfil, setPerfil] = useState({});

    useEffect(() => {
        getFollowing(page);
        getPerfil(userId,setPerfil);
    }, [userId]);

    const getFollowing = async (pageid) => {
        try {
            let token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };

            const response = await axios.get(
                `http://localhost:4100/api/follow/following/${userId}`,
                config
            );
              console.log(response.data.followings);
             const { data, status } = response;
            let cleanUsers=[]
            response.data.users.forEach(user => 
              cleanUsers= [...cleanUsers, user.followed]);
              console.log(data.users);
            data.users=cleanUsers;

            if (status === 200) {
                if (pageid === 1) {
                    setUser(data.users);
                } else {
                    setUser([...users, ...data.users]);
                }
                setFollowing(data.followings);
            }
        } catch (error) {
            // Manejar errores de la solicitud HTTP aquí
            console.error("Error fetching data: ", error);
        }
    };

  

    const handleLike = async (userId) => {
        const token = localStorage.getItem("token");
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
    
        const body = {
          followed: userId,
        };
    
        const response = await axios.post(
          "http://localhost:4100/api/follow/save",
          body,
          config
        );
    
        // Manejar la respuesta del servidor
        const { data, status } = response;
    
        if (status == 200) {
          setFollowing([...following,userId]);
        }
      };
    
      const handleDislike = async (userId) => {
        console.log(userId);
        const token = localStorage.getItem("token");
        console.log(token);
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
    
    
        const response = await axios.delete(`http://localhost:4100/api/follow/delete/${userId}`,config );
    
        // Manejar la respuesta del servidor
        const { data, status } = response;
    
        if (status == 200) {
          setFollowing(following.filter((follow) => follow !== userId));
        }
      };

    return {
        users,
        following,
        handleLike,
        handleDislike,
        Perfil
    };
}

export default useFollowing;
