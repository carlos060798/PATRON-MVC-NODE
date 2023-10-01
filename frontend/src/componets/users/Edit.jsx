import avatar from "../../assets/img/user.png";
import SerializeForm from "../../helpers/serializeForm";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


function EditPage() {
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
  return (

    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Editar Usuario</h2>
                <form onSubmit={updateUser}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      defaultValue={user.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="surname" className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                      defaultValue={user.surname}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nick" className="form-label">
                      Nick
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nick"
                      name="nick"
                      defaultValue={user.nick}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nick" className="form-label">
                      bio
                    </label>
                    <textarea
                      type="t"
                      className="form-control"
                      name="bio"
                      defaultValue={user.bio}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      defaultValue={user.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                  </div>
                  <br />
                  <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">
                      Avatar
                    </label>
                    {user.image !== "image.png" ? (
                      <img
                        className="img-thumbnail mb-3"
                        style={{ width: "32px", height: "32px" }}
                        src={`http://localhost:4100/api/users/avatar/${user.image}`}
                        alt="Avatar"
                      />
                    ) : (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="img-thumbnail mb-3"
                        style={{ width: "32px", height: "32px" }}
                      />
                    )}
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      name="file0"
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPage;
