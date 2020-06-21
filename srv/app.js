const express = require("express")
const http = require("http")

const app = express();
app.use("/static", express.static("static_assets"));

app.get("/", (req, res) => {
    res.sendFile("./html/index.html", {root: process.cwd()});
});

const server = http.createServer(app).listen(8000);