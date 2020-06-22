import * as express from "express"
import * as expressSession from "express-session"
import * as bodyParser from "body-parser"
import * as http from "http"
import * as uuid from "uuid"
import { SessionSecret } from "./env"
import GameData from "./GameData"

const GameStore = new Map<string, GameData>()

function CreateGame(creator_id: string, name?: string) {
    const new_game = new GameData(creator_id, name)
    GameStore.set(new_game.game_id, new_game)
    return new_game.game_id
}

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({
    secret: SessionSecret(),
    genid: _ => uuid.v4()
}))
app.use("/static", express.static("static_assets"))

app.get("/", (req, res) => {
    res.sendFile("./html/index.html", {root: process.cwd()})
})

app.get("/join/:game_id", (req, res) => {
    res.sendFile("./html/join.html", {root: process.cwd()})
})

// Create a new game object
app.post("/game", (req, res) => {
    const new_game_id = CreateGame(req.session.id, req.body.game_name)
    res.redirect("/join/" + new_game_id)
})

// Player object is created and added to the game
app.post("/join/:game_id", (req, res) => {

})

const server = http.createServer(app).listen(8000);