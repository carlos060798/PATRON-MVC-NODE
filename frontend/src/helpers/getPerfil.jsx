import axios from "axios";


const getPerfil = async (userId,setState) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const request = await axios.get(
      `http://localhost:4100/api/users/profile/${userId}`,
      config
    );
    const {data, status} = request;
    if(status === 200){
      setState(data.user);
    }
    return data;
  }

export default getPerfil;


