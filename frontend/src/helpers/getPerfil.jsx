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


const  getPublications= async(nextPage=1)=>{
  const config={
    headers:{
      "Content-Type":"application/json",
      Authorization:token
    }
  }
  const  request = await axios.get(`http://localhost:4100/api/public/user/${userId}/${nextPage}`,config);

  const {data,status} = request;

  if(status===200){
    setPublicationUsers([data.publications]);
  }

}