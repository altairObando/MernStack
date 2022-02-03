const express = require("express");
const morgan = require("morgan")
const path = require("path");
const { mongoose } = require("./database/index");
const app = express();
const port = 3000;
// Config
app.set("port", process.env.PORT || port)
// Middleware
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use("/api/contacts", require("./routes/ContactController"));
// Static
app.use(express.static(path.join(__dirname, "www")))



app.listen(app.get("port"), () => console.log(`Server running at ${app.get("port")}`))