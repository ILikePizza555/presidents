const express = require("express")
const http = require("http")

const app = express()

app.get("/", (req, res) => {
    res.sendFile("html/index.html")
})

const server = http.createServer(app).listen(8000)