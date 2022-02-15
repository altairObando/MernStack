const express = require("express");
const Products = require("../models/Products");
const ValidateFields = require("../util/validateFields");
const router = express.Router();


router.get("/", async(request, response) => {
    if(!ValidateFields.hasQueryValues(request.query)){
        const contacts = await Products.find();
        response.json(contacts);
        return;
    }
    const queryValues = ValidateFields.clearQueryValues(request.query);
    const queryResult = await Products.find(queryValues).collation({ locale: "en", strength: 2 })
    return response.json(queryResult);
})

router.get("/:id", async(request, response) => {
    const { params : { id }} = request;
    const data = await Products.findById(id);
    return response.json(data);
})

router.post("/", async(request, response) => {
    const { code, name, description, unitPrice, categories } = request.body;
    const newProduct = new Products({ code, name, description, unitPrice, categories });
    await newProduct.save();
    return response.json({status: 200, created: true, data: newProduct });
})

module.exports = router;