require("dotenv").config();
const express = require("express");
const morgan = require("morgan")
const path = require("path");
const cors = require("cors");
_ = require("./database/index");
const app = express();
const port = 5000;
// Config
app.set("port", process.env.PORT || port)
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
// Routes
app.use("/api/contacts", require("./routes/ContactController"));
app.use("/api/files", require("./routes/UploadController"));
// Static
app.use(express.static(path.join(__dirname, "www/build")))



app.listen(app.get("port"), () => console.log(`Server running at ${app.get("port")}`))