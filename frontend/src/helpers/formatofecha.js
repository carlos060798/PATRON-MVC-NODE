const formatearFecha = (fecha) => {
    //  funcion para formatear la fecha
    const nuevaFecha = new Date(fecha); // crea un objeto de tipo fecha
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()); //ajusta la hora a la zona horaria
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format( nuevaFecha); // retorna la fecha formateada
  };

    export default formatearFecha; // exporta la funcion para ser usada en otros archivos