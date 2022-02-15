const express = require("express");
const router = express.Router();
const dbContact = require("../models/Contact");
const dbContactUploads = require("../models/ContactUploads");
const ValidateFields = require("../util/validateFields");

router.get("/", async (request, rs) => {
    if(!ValidateFields.hasQueryValues(request.query)){
        const contacts = await dbContact.find();
        rs.json(contacts);
        return;
    }
    const queryValues = ValidateFields.clearQueryValues(request.query);
    const queryResult = await dbContact.find(queryValues).collation({ locale: "en", strength: 2 })
    return rs.json(queryResult);

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
    return response.json({status: 200, created: true, data: newContact });
});

router.put("/:id", async(request, response) => {
    const { params: { id } } = request;
    const { _Id : _id, Identificacion,Nombre,SNombre,Apellido,SApellido,FechaNacimiento,FechaIngreso,Telefono,Email,Activo } = request.body;
    const currentContact = { _id, Identificacion,Nombre,SNombre,Apellido,SApellido,FechaNacimiento,FechaIngreso,Telefono,Email,Activo };
    const result = await dbContact.findByIdAndUpdate(id, currentContact );
    return response.json({ status: 200, updated: true, data: result });
});

router.delete("/:id", async(request, response) => {
    const { params: { id } } = request;
    const result = await dbContact.findByIdAndDelete(id);
    return response.json({ status: 200, deleted: true, data : result });
})

router.get("/uploads/:id", async(request, response) => {
    const { params: { id } } = request;
    const uploadedImages = await dbContactUploads.find({ contactId: id });
    return response.json({ success: true, status: 200 , data: uploadedImages });
})


module.exports = router;