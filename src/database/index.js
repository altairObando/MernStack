const mongoose = require("mongoose");
const URI = "mongodb+srv://altair:kamui69*@cluster0.z2aoa.mongodb.net/cotracosan?retryWrites=true&w=majority";
mongoose.connect(URI)
    .then( db => console.log("Conectado a db"))
    .catch( err => console.log(err));

module.exports = mongoose;