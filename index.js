const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/route");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || "3030";
const mongoURL = process.env.MONGOURL;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1",router);

app.get("/",(req,res) => {
    res.send("hello from server");
})


mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    app.listen(PORT,() => {
        console.log(`our server is up & running on port ${PORT}`)
    })
});

