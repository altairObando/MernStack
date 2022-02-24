const mongoose = require("mongoose");
const { Schema } = mongoose;

const CatalogValues = new Schema({
    catalogId: Schema.Types.ObjectId,
    dateAdded: { type: Schema.Types.Date, default: new Date() },
    values: Schema.Types.Array
})


module.exports = mongoose.model("CatalogValues", CatalogValues)