const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    code: { 
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    unitPrice:{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    categories: [String],
});

module.exports = mongoose.model("Products", ProductsSchema);