const express = require("express");
const Products = require("../models/Products");
const ValidateFields = require("../util/validateFields");
const router = express.Router();


router.get("/", async(request, response) => {
    if(!ValidateFields.hasQueryValues(request.query)){
        const products = await Products.find();
        response.json({data: products,  message: products && products.length > 0 ? "success": "Products Not Found" });
        return;
    }
    const queryValues = ValidateFields.clearQueryValues(request.query);
    const queryResult = await Products.find(queryValues).collation({ locale: "en", strength: 2 })
    return response.json({ data: queryResult, message: queryResult && queryResult.length > 0 ? "success": "Products Not Found"});
})

router.get("/:id", async(request, response) => {
    const { params : { id }} = request;
    const data = await Products.findById(id);
    const exists = data && data.length > 0;
    return response.json({ data, message: exists ? "success": "Product Not Found", status: exists ? "Ok": "Failure" });
})

router.post("/", async(request, response) => {
    const { code, name, description, unitPrice, categories } = request.body;
    const newProduct = new Products({ code, name, description, unitPrice, categories });
    await newProduct.save();
    return response.json({ status: 200, created: true, data: newProduct, message: "New product added " + name });
});

router.put("/:id",async(request, response) =>{
    const { params : { id }} = request;
    const { code, name, description, unitPrice, categories } = request.body;
    const result = await Products.findByIdAndUpdate(id, {code, name, description, unitPrice, categories});
    return response.status(200).json({ data: result, message: "Updated"})
})

router.delete("/:id", async(request, response) => {
    const { params : { id }} = request;
    try {
        const result = await Products.findByIdAndRemove(id);
        return response.status(200).json({ message: "Deleted", data: result, succes: true })
    } catch (error) {
        return response.status(200).json({ message: error, data: result, succes: false })
    }
})

module.exports = router;