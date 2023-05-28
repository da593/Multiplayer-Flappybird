import { GameState_I } from "GameState/types"
import { Player } from "Player";

export class Lobby {
    #lobbyId:string;
    #players:Set<Player>;
    #maxPlayers:number;
    constructor(id:string, maxPlayers:number) {
        this.#lobbyId = id;
        this.#players = new Set();
        this.#maxPlayers = maxPlayers;
    }

    setLobbyId(id:string):void {
        this.#lobbyId = id;
    }


    setMaxPlayers(maxPlayers:number):void {
        this.#maxPlayers = maxPlayers;
    }

    getLobbyId():string {
        return this.#lobbyId
    }

    getMaxPlayers():number {
        return this.#maxPlayers
    }

    addPlayer(player:Player):void {
        this.#players.add(player);
    }

    getPlayers():Set<Player> {
        return this.#players;
    }

}