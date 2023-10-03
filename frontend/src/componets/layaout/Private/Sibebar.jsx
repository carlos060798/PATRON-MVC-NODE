import React, { useState } from "react";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

function SideNavbar() {
  const { user, counter } = useAuth();
  let token = localStorage.getItem("token");

  const [formData, setFormData] = useState({});

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
      if (status === 200 && responseImg.status === 200) {
        const formPublication = document
          .querySelector("#publicationform")
          .reset();
      }
    }
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="row">
          <div className="card">
            <div className="card-body text-center">
              {user.image !== "image.png" ? (
                <img
                  className="img-thumbnail mb-3"
                  style={{ width: "150px", height: "150px" }}
                  src={`http://localhost:4100/api/users/avatar/${user.image}`}
                  alt="Avatar"
                />
              ) : (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="img-thumbnail mb-3"
                  style={{ width: "150px", height: "150px" }}
                />
              )}

              <h5 className="card-title">
                {user.name} {user.surname}
              </h5>
              <p className="card-text">{user.nick}</p>
              <div className="d-flex ">
                <Link
                  to={`siguindo/${user._id}`}
                  className="btn btn-primary btn-sm mx-2"
                >
                  Seguidores:{counter.following}{" "}
                </Link>
                <Link
                  to={`segidores/${user._id}`}
                  className="btn btn-primary btn-sm mx-2"
                >
                  Seguidos: {counter.followed}
                </Link>
                <Link
                  to={`/profile/delete/${user._id}`}
                  className="btn btn-primary btn-sm mx-2"
                >
                  Publicaciones: {counter.publications}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="card-body">
              <form id="publicationform" onSubmit={CreatePublication}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="¿Qué estás pensando?"
                    rows="3"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="file0" className="form-label">
                    Subir imagen
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="form-control"
                    name="file0"
                    value={formData.file0}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Publicar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
