const express = require("express");
const router = express.Router();
const dbContact = require("../models/Contact");

router.get("/", async (_, rs) =>{
    const contacts = await dbContact.find();
    rs.json(contacts);
});

router.get("/:id" , async(request, response) => {
    const { params: { id } } = request;
    const contacts = await dbContact.findById(id);
    response.json(contacts);
})

router.post("/", async(request, response) => {
    const { _Id, Identificacion,Nombre,SNombre,Apellido,SApellido,FechaNacimiento,FechaIngreso,Telefono,Email,Activo } = request.body;
    const newContact = new dbContact({ _Id, Identificacion,Nombre,SNombre,Apellido,SApellido,FechaNacimiento,FechaIngreso,Telefono,Email,Activo });
    await newContact.save();
    return response.json({status: 200, created: true, newContact });
});

router.put("/:id", async(request, response) => {
    const { params: { id } } = request;
    const { _Id : _id, Identificacion,Nombre,SNombre,Apellido,SApellido,FechaNacimiento,FechaIngreso,Telefono,Email,Activo } = request.body;
    const currentContact = { _id, Identificacion,Nombre,SNombre,Apellido,SApellido,FechaNacimiento,FechaIngreso,Telefono,Email,Activo };
    console.table(request.body);
    const result = await dbContact.findByIdAndUpdate(id, currentContact );
    return response.json({ status: 200, updated: true, result });
});



module.exports = router;