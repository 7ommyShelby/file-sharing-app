const multer = require("multer")
require("dotenv").config()
const path = require("path");
const nodemailer = require('nodemailer')
const filemodel = require("../model/file");
const savepath = path.join(__dirname, "..", "files")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, savepath)
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10)
        const filename = Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage
}).single("file")


const uploadfile = async (req, res) => {

    upload(req, res, async (error) => {
        console.log(req.body);
        if (error) {
            console.log("there has been an error, please try again", error);
            return;
        }

        const newfile = new filemodel({
            originalname: req.file.originalname,
            newfilename: req.file.filename,
            path: req.file.path
        })

        const newaddedfile = await newfile.save()

        console.log("File uploaded successfully");
        res.json({
            success: true,
            message: "Files uploaded",
            file_id: newaddedfile._id
        })
    })
}
const dynamiclink = async (req, res) => {

    try {
        const fileid = req.params.uuid
        // console.log(fileid);

        const file = await filemodel.findById(fileid);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "file not found"
            })
        }

        res.json({
            status: true,
            message: "file downloading started",
            link: "http://localhost:9000/files/download/" + fileid
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!", error
        })
    }


}
const downloadfile = async (req, res) => {
    try {
        const fileid = req.params.uuid

        const file = await filemodel.findById(fileid);

        if (!file) {
            return res.end("Invalid link")
        }
        res.download(file.path, file.originalname)

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong", error
        })
    }

}
const sendfile = async (req, res) => {

    const { fileid, shareto } = req.body;
    console.log(req.body);
    const downloadlink = "http://localhost:9000/files/download/" + fileid

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.PASS
        },
    });

    const mailOptions = {
        from: process.env.MAIL_ID, // Replace with your email address
        to: shareto, // Replace with the recipient's email address
        subject: "Shared Content", // Replace with your desired subject
        // text: "here is the link to download the file :",downloadlink 
        html : `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>My Page</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <div style="background-color: #f2f2f2; padding: 20px; text-align: center;">
            <h1 style="color: #333; font-size: 36px;">Shared Contect</h1>
            <p style="color: #666; font-size: 18px;">Here is a download link</p>
            <a href="${downloadlink}" style="color: #007bff; text-decoration: none;">Download</a>
          </div>
        </body>
        </html>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.json({
        status: true,
        message: "file sent"
    })
}

const filecontrollers = {
    uploadfile,
    dynamiclink,
    downloadfile,
    sendfile
}

module.exports = filecontrollers