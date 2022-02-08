const UploadMiddleWare = require("../middleware/uploads");
const Grid = require("gridfs-stream");
const express = require("express");
const mongoose = require("mongoose");
_ = require("../database/index");
const dbUploads = require("../models/ContactUploads");
const router = express.Router();

let gfs;

const conx = mongoose.connection;
conx.once("open", () => {
    gfs = Grid(conx.db, mongoose.mongo);
    gfs.collection("photos");
});

// router.get("/:contactId", async(request, response) =>{
//     gfs.files.find().toArray((err, files) =>{
//         if(!files || files.length  === 0){
//             return response.status(200).json({
//                 success: false,
//                 message: "Files not found"
//             });
//         }
//         return response.json({
//             success: true,
//             files
//         })
//     })
// })

router.get("/:filename", async(req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.files.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
})

router.post("/upload", UploadMiddleWare.single("file"), async(request, response, next) => {
    if (request.file === undefined) return response.send("you must select a file.");
    const imgUrl = `${process.env.HOST}:${process.env.PORT}/file/${request.file.filename}`;
    const { contactId } = request.body;
    const file = await gfs.files.findOne({ filename: request.file.filename });
    const newFile = new dbUploads({ contactId, fileId: file._id, fileName: request.file.filename });
    await newFile.save();
    return response.send(imgUrl);
});


router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

module.exports = router;