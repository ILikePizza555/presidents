import * as express from "express"
import * as expressSession from "express-session"
import * as bodyParser from "body-parser"
import * as http from "http"
import * as uuid from "uuid"
import { SessionSecret } from "./env"
import GameData from "./GameData"
import PlayerData from "./PlayerData"

const GameStore = new Map<string, GameData>()
const PlayerStore = new Map<string, PlayerData>()

function CreateGame(creator_id: string, name?: string) {
    const new_game = new GameData(creator_id, name)
    GameStore.set(new_game.game_id, new_game)
    return new_game.game_id
}

const app = express()
app.set("view engine", "pug")
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({
    secret: SessionSecret(),
    genid: _ => uuid.v4(),
    resave: true,
    saveUninitialized: true
}))
app.use("/static", express.static("static_assets"))

app.get("/", (req, res) => {
    res.render("index", {pageTitle: "Presidents - Create Game"})
})

app.get("/join/:game_id", (req, res) => {
    res.render("join", {
        pageTitle: "Joining game",
        game_url: "/join/" + req.params.game_id
    })
})

app.get("/game/:game_id", (req, res) => {
    if (!GameStore.has(req.params.game_id)) {
        res.status(404).send("Game not found")
        return
    }

    const game_data = GameStore.get(req.params.game_id)
    const player = PlayerStore.get(req.session.id)
    res.send(`<p>player name: ${player.player_name}
        <p>game name: ${game_data.game_name}`)
})

// Create a new game object
app.post("/game", (req, res) => {
    const new_game_id = CreateGame(req.session.id, req.body.game_name)
    res.redirect("/join/" + new_game_id)
})

// Player object is created and added to the game
app.post("/join/:game_id", (req, res) => {
    PlayerStore.set(req.session.id, new PlayerData(req.session.id, req.body.player_name))
    GameStore.get(req.params.game_id).players.push(req.session.id)
    
    res.redirect("/game/" + req.params.game_id)
})

const server = http.createServer(app).listen(8000);