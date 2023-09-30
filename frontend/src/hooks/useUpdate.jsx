import useAuth from "./useAuth";
import SerializeForm from "../helpers/serializeForm";
import axios from "axios";

function useUpdate() {
  const { user,setUser } = useAuth();
  console.log(user);

  const updateUser = async (e) => {
    e.preventDefault();
    let newDataUser = SerializeForm(e.target);
    const token = localStorage.getItem("token");

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

    const { data } = response;
    delete data.updatedUser.password;
    setUser(data.updatedUser);
    console.log(data.updatedUser);
  };

  return { user, updateUser };
}

export default useUpdate;
