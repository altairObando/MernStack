const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactUploadSchema = new Schema({
    contactId: Schema.Types.String,
    fileId: Schema.Types.ObjectId,
    fileName: Schema.Types.String
});

module.exports = mongoose.model("ContactUpload", ContactUploadSchema);
