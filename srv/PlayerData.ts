export default class PlayerData {
    readonly player_id: string
    player_name?: string

    constructor(player_id: string, player_name?: string) {
        this.player_id = player_id
        this.player_name = player_name
    }
}