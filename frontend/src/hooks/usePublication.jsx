import { useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const usePublication = () => {

  const [formData, setFormData] = useState( {text: "",
  file0: ""});
  const { user } = useAuth();

  let token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const CreatePublication = async (e) => {
    e.preventDefault();

    let nuwData = formData;
    nuwData.user = user._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const request = await axios.post(
      "http://localhost:4100/api/public/save",
      nuwData,
      config
    );
    const { data, status } = request;
    const publicationid = data.publicationSaved._id;
    const fileinput = document.querySelector("#file");

    if (status === 200 && fileinput.files[0]) {
      const formData = new FormData();
      formData.append("file0", fileinput.files[0]);
      const config2 = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };
      const responseImg = await axios.post(
        `http://localhost:4100/api/public/upload/${publicationid}`,
        formData,
        config2
      );
      console.log(responseImg);
      if (request.status === 200 && responseImg.status === 200) {
        const formPublication = document
          .querySelector("#publicationform")
          .reset();
      }
    }
  };

  return { formData, handleChange, CreatePublication };
};

export default usePublication;