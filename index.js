const express = require("express");
const fileroutes = require("./routes/file")
const mongoose = require("mongoose")
const app = express();
const port = 9000;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/filesharingapp")
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(() => {
        console.log("Could not connect to database");
    })


app.use(fileroutes)


app.listen(port, () => {
    console.log("server running at ", port);
})