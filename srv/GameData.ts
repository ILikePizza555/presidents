import * as uuid from "uuid"
import * as randomWords from "random-words"

export default class GameData {
    readonly game_id: string
    game_name: string
    owner_id: string
    players: string[]

    constructor(creator_id: string, game_name?: string) {
        this.game_id = uuid.v4()
        this.game_name = game_name || randomWords({min: 3, max: 7, join: "-"})
        this.owner_id = creator_id
        this.players = []
    }
}