const { response } = require("express");
const express = require("express");
const router = express.Router();
const dbContact = require("../models/Contact");

/**
 * This method is common used for check if a query params from request
 * has values to filter data to query
 * @param {object} record Query params
 * @returns true if has values to apply filters
 * @author Noel Obando
 */
const hasQueryValues   = (record) => Object.keys(record).some(k => record[k] && record[k] != null && record[k] != '');
/**
 * Este método permite validar y generar un objeto listo para filtrar los datos de una consulta.
 * @param {object} record Query Params
 * @returns object with valid data
 * @author Noel Obando
 */
const clearQueryValues = (record) => {
    let newQueryObject = {};
    Object.keys(record)
            .filter( k => record[k] && record[k] != null && record[k] != '')
            .forEach(key => {
                newQueryObject[key] = record[key];
            });
    return newQueryObject;
}

router.get("/", async (request, rs) => {
    if(!hasQueryValues(request.query)){
        const contacts = await dbContact.find();
        rs.json(contacts);
        return;
    }
    const queryValues = clearQueryValues(request.query);
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



module.exports = router;