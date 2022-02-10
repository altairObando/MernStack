const UploadMiddleWare = require("../middleware/uploads");
const express = require("express");
const mongoose = require("mongoose");
_ = require("../database/index");
const fs = require("fs");
const dbUploads = require("../models/ContactUploads");
const router = express.Router();

let bucket;
const conx = mongoose.connection;
conx.once("open", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "photos"
    });
});

router.get("/gallery/:contactId", async(request, response) =>{
    const data = await dbUploads.find({ contactId: request.params.contactId });
    if(!data && data.length === 0){
        return response.status(200).json({
            success: false,
            message: "No Images"
        });
    }
    const filesWithUri = data.map( file => {
        const localUri = `${process.env.HOST}/api/files/${file.fileName}`;
        const newFile = { localUri, _id: file._id, contactId: file.contactId, fileName: file.fileName, fileId: file.fileId };
        return newFile;
    });
    return response.json({ success: true, filesWithUri })
})

router.get("/:filename", async(req, res) => {
    try {
        const files = await bucket.find({ filename: req.params.filename });
        files.toArray((err, files) =>{
            if(err){
                return res.json(err);
            }
            if(!files || files.length === 0)
                return res.status(400).json({
                    success: false,
                    message: "Image not found"
                })
            
            bucket.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    } catch (error) {
        console.log(error);
        res.send("not found");
    }
})

router.post("/upload", UploadMiddleWare.single("file"), async(request, response, next) => {
    if (request.file === undefined) return response.send("you must select a file.");
    const imgUrl = `${process.env.HOST}:${process.env.PORT}/file/${request.file.filename}`;
    const { contactId } = request.body;

    const bucketFiles = await bucket.find({ filename: request.file.filename });
    bucketFiles.toArray(async (err, file) =>{
        const newFile = new dbUploads({ contactId, fileId: file[0]._id, fileName: request.file.filename });
        await newFile.save();
    });
    return response.send(imgUrl);
});


router.delete("/:fileId", async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId( req.params.fileId );
        await dbUploads.findOneAndDelete({ fileId: id });
        await bucket.delete(id);

        res.json({ message: "Deleted image ", success: true });
    } catch (error) {
        console.log(error);
        res.json({ message: "Cannot delete the image", success: false });
    }
});

module.exports = router;