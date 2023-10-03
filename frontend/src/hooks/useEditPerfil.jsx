
import axios from "axios";
import useAuth from "./useAuth";
import SerializeForm from "../helpers/serializeForm";

const  useEdituser = () => {
    const { user, setUser } = useAuth();


    const updateUser = async (e) => {
    e.preventDefault();
    let newDataUser = SerializeForm(e.target);
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const response = await axios.put(
        `http://localhost:4100/api/users/update/${user._id}`,
        newDataUser,
        config
      );
      console.log(response);
      const { data,status } = response;
      console.log(data,status);
      delete data.updatedUser.password;
      setUser(data.updatedUser);
      console.log(data.updatedUser);

      // imagen cambiar
      const  fileinput= document.querySelector("#file");

      if (status == 200 && fileinput.files[0]) {
        const formData = new FormData();
        formData.append("file0", fileinput.files[0]);
        console.log(formData);
        const config2 = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
        const responseImg = await axios.post(
          `http://localhost:4100/api/users/upload`,
          formData,
          config2
        );
       
      }
      console.log("imagen cambiada");
    }
    catch (error) {
      console.log(error);
    }
  };

return {
    updateUser

}
}
  export default useEdituser;