const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
    Identificacion: { 
        type: String, 
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    SNombre: {
        type: String,
        required: false
    },
    Apellido:{
        type: String,
        required: true
    },
    SApellido: {
        type: String,
        required: false
    },
    FechaNacimiento: {
        type: Date,
        required: true
    },
    FechaIngreso: {
        type: Date,
        required: false,
        default: Date.now()
    },
    Telefono : String,
    Email: String,
    Activo: Boolean
});

module.exports = mongoose.model("Contacto", ContactSchema);