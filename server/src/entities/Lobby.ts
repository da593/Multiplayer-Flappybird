import { Game } from "GameState/Game";
import { Entity } from "./Entity";
import { Player } from "./Player";
import { IdManager } from "Managers/IdManager";
import { Pipe } from "./Pipe";


export class Lobby extends Entity {
    players:Map<Player,Pipe>;
    maxPlayers:number;
    game?:Game;

    constructor(id:String, maxPlayers:number) { 
        super(id)
        this.maxPlayers = maxPlayers 
        this.players = new Map()
    }
    

    public initalizeGame() {
        if (this.players.size < 1) {
            throw("Not enough players");
        }
        else if (this.players.size > this.maxPlayers) {
            throw("Too many players in lobby");
        }
        else {
            this.game = new Game();
        }
    }


    public addPlayer(player:Player,pipe:Pipe) {
       this.players.set(player,pipe);
    }

    public removePlayer(player:Player) {
        this.players.delete(player);
    }
    
}