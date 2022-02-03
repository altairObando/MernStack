const express = require("express");
const router = express.Router();
const dbContact = require("../models/Contact");

router.get("/", async (rq, rs) =>{
    const contacts = await dbContact.find();
    rs.json(contacts);
})


module.exports = router;