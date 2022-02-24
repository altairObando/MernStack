const express = require("express");
const router = express.Router();
const catalog = require("../models/Catalogs");
const ValidateFields = require("../util/validateFields");


router.get("/", async(request, response) =>{
    if(!ValidateFields.hasQueryValues(request.query)){
        const contacts = await catalog.find();
        response.json(contacts);
        return;
    }
    const queryValues = ValidateFields.clearQueryValues(request.query);
    const queryResult = await catalog.find(queryValues).collation({ locale: "en", strength: 2 })
    return response.json(queryResult);
})

router.post("/", async(request, response) =>{
    const { _id, code, name, isActive, fields } = request.body;
    let newCatalog = new catalog({ _id, code, name, isActive, fields });
    await newCatalog.save();
    return response.json({status: 200, created: true, data: newCatalog });
})

router.put("/:id", async(request, response) => {
    const { params: { id } } = request;
    const { _id, code, name, isActive, fields } = request.body;
    const currentCatalog = { _id, code, name, isActive, fields };
    const result = await catalog.findByIdAndUpdate(id, currentCatalog );
    return response.json({ status: 200, updated: true, data: result });
});


module.exports = router