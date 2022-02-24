const mongoose = require("mongoose");
const { Schema } = mongoose;
const CatalogSchema = new Schema({
    name: Schema.Types.String,
    code: Schema.Types.String,
    description: Schema.Types.String,
    isActive: Schema.Types.Boolean,
    fields: [{
        fieldName: Schema.Types.String,
        dataType: Schema.Types.String
    }]
})

module.exports = mongoose.model("Catalogs", CatalogSchema);