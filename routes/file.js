const express = require("express");

const router = express.Router();

const {uploadfile, sendfile, dynamiclink, downloadfile} = require("../controllers/file")


router.post("/files", uploadfile)

router.get("/files/:uuid", dynamiclink)

router.get("/files/download/:uuid", downloadfile)

router.post("/api/files/send", sendfile)

module.exports = router
