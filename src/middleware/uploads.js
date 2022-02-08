const multer = require("multer");
const MGFS = require("multer-gridfs-storage");

const sufix = "mern-stack";
const storage = new MGFS.GridFsStorage({
    url: process.env.DB,
    options: {
        useNewUrlParser: true, useUnifiedTopology: true 
    },
    file: (request, file) =>{
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${sufix}-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-${sufix}-${file.originalname}`,
        };
    }
});

module.exports = multer({ storage });