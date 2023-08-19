// logica del negocio
import Models from '../models/index.js'

// se extrae de index.js de modelos los modelo de datos que se van a usar

const { TRACKSMODEL } = Models;

// se crea la logica de negocio

const getItems = (req, res) => {
    res.json({ message: "Bienvenido a la API de canciones" });

}

const getItem = (req, res) => {
    res.json({ message: "Bienvenido a la API de canciones" });

}

const CreadItem= (req, res) => {
    
}

const UpdateItem = (req, res) => {}

const DeleteItem = (req, res) => {}


export {
    getItems,
    getItem,
    CreadItem,
    UpdateItem,
    DeleteItem
}