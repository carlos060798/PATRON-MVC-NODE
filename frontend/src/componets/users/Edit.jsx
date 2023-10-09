import avatar from "../../assets/img/user.png";
import useAuth from "../../hooks/useAuth";
import useEdituser from "../../hooks/useEditPerfil";
import { useState } from "react";

// deuda tecnica
// mejorar la actualizacion del daros de la iamgen y que no se liste  la contraseña


function EditPage() {
  const { user, setUser } = useAuth();
  const { updateUser } = useEdituser();
  const [apiMessage, setApiMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(e);
      setApiMessage({ type: "success", message: "Usuario modificado correctamente" });
      // Recargar la página después de mostrar la alerta
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Recargar la página después de 3 segundos
    } catch (error) {
      // Manejar errores aquí si es necesario
      setApiMessage({ type: "error", message: error.response.data.msg || "Error al modificar el usuario" });
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
               
                <h2 className="text-center mb-4 fw-bold ">Editar Usuario</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">
                      Bio
                    </label>
                    <textarea className="form-control" id="bio" name="bio" defaultValue={user.bio} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input type="password" className="form-control" id="password" name="password" />
                  </div>
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
                    <input type="file" className="form-control" id="file" name="file0" />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Guardar Cambios
                    </button>
                  </div>
                  {apiMessage && (
                  <div className={`alert alert-${apiMessage.type} mt-3`} role="alert">
                   <p className="text-center">{apiMessage.message}</p> 
                  </div>
                )}
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
/*function EditPage() {
  const { user, setUser } = useAuth();
 const  {updateUser} = useEdituser();

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

export default EditPage; */
