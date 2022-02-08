const mongoose = require("mongoose");

mongoose.connect(process.env.DB)
    .then( db => console.log("Conectado a db"))
    .catch( err => console.log(err));

module.exports = mongoose;