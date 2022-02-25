const express   = require("express");
const router    = express.Router();
const catalog   = require("../models/Catalogs");
const catalogValues = require("../models/CatalogValues");
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
    return response.json({ status: 200, created: true, data: newCatalog });
})

router.put("/:id", async(request, response) => {
    const { params: { id } } = request;
    const { _id, code, name, isActive, fields } = request.body;
    const currentCatalog = { _id, code, name, isActive, fields };
    const result = await catalog.findByIdAndUpdate(id, currentCatalog );
    return response.json({ status: 200, updated: true, data: result });
});

router.delete("/:id", async(request, response) =>{
    const { params: { id } } = request;
    const result = await catalog.findByIdAndDelete(id);
    await catalogValues.findOneAndRemove({ catalogId: id})
    return response.json({ status: 200, deleted: true, data : result });
})

/** Methods for values of catalog */
router.get("/values/:id", async(request, response) => {
    const { params: { id : catalogId }} = request;
    console.log(catalogId)
    const values = await catalogValues.find({ catalogId : catalogId});
    return response.json(values);
})

router.put("/values/:id", async(request, response) => {
    const { params: { id } } = request;
    const { _id, catalogId, dateAdded, values } = request.body;
    const result = await catalogValues.findByIdAndUpdate(id, { _id, catalogId, dateAdded,values });
    return response.json({ status: 200, updated: true, data: result })
})

router.post("/values", async(request, response) => {
    const { catalogId, dateAdded, values } = request.body;
    const newValues = new catalogValues({ catalogId, dateAdded, values });
    _ = await newValues.save()
    return response.json({ status: 200, created: true, data: newValues})
});

module.exports = router