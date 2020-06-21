import * as express from "express"
import * as express_session from "express-session"
import * as http from "http"

const app = express();
app.use(express_session());
app.use("/static", express.static("static_assets"));

app.get("/", (req, res) => {
    res.sendFile("./html/index.html", {root: process.cwd()});
});

const server = http.createServer(app).listen(8000);