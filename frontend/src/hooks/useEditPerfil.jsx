import axios from "axios";
import useAuth from "./useAuth"; // Importa el hook useAuth para obtener información del usuario actual.
import SerializeForm from "../helpers/serializeForm"; // Importa la función para serializar el formulario.

const useEdituser = () => {
    const { user, setUser } = useAuth(); // Obtiene el usuario actual y la función setUser del contexto de autenticación.

    // Función para actualizar el usuario.
    const updateUser = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario.
        let newDataUser = SerializeForm(e.target); // Serializa los datos del formulario.

        const token = localStorage.getItem("token"); // Obtiene el token de autenticación almacenado en el localStorage.

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token, // Configura los encabezados con el token de autorización.
                },
            };

            // Envía una solicitud PUT para actualizar el usuario en el servidor.
            const response = await axios.put(
                `http://localhost:4100/api/users/update/${user._id}`, // URL para la actualización del usuario.
                newDataUser, // Datos del usuario actualizados.
                config // Configuración de la solicitud con los encabezados.
            );

            // Maneja la respuesta del servidor.
            const { data, status } = response;

            delete data.updatedUser.password; // Elimina la contraseña del objeto de usuario actualizado.
            setUser(data.updatedUser); // Actualiza el contexto de usuario con los datos del usuario actualizado.

            // Maneja la carga de una nueva imagen de perfil si se selecciona un archivo.
            const fileInput = document.querySelector("#file");
            if (status === 200 && fileInput.files[0]) {
                const formData = new FormData();
                formData.append("file0", fileInput.files[0]); // Agrega el archivo al objeto FormData.

                const config2 = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token, // Configura los encabezados para la carga de archivos.
                    },
                };

                // Envía una solicitud POST para cargar la nueva imagen de perfil.
                const responseImg = await axios.post(
                    `http://localhost:4100/api/users/upload`, // URL para la carga de archivos.
                    formData, // Datos del formulario con la imagen.
                    config2 // Configuración de la solicitud con los encabezados.
                );
            }
            console.log("imagen cambiada"); // Mensaje para indicar que la imagen ha sido cambiada con éxito.
        } catch (error) {
            console.log(error); // Maneja los errores en caso de que ocurra un problema en las solicitudes.
        }
    };

    return {
        updateUser, // Devuelve la función updateUser para su uso en el componente que importe este hook.
    };
};

export default useEdituser; // Exporta el hook useEdituser para su uso en otros archivos.
