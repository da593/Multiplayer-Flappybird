import { Game } from "GameState/Game";
import { Entity } from "./Entity";
import { Player } from "./Player";
import { entityManager } from "Managers/EntityManager";
import { Pipe } from "./Pipe";
import { LobbyData } from "@flappyblock/shared";



export class Lobby extends Entity {
    players: Array<Player>;
    maxPlayers:number;
    game?:Game;

    constructor(id:string, maxPlayers:number) { 
        super(id);
        this.maxPlayers = maxPlayers;
        this.players = new Array();

    }
    
    
    public initalizeGame() {
        if (this.players.length < 1) {
            throw("Not enough players");
        }
        else if (this.players.length > this.maxPlayers) {
            throw("Too many players in lobby");
        }
        else {
            this.game = new Game(this.players);
        }
    }


    public addPlayer(): string {
        if (this.players.length >= this.maxPlayers) {
            throw("Lobby is full");
        }
        const pipeId = entityManager.generateId();
        const newPipe = new Pipe(pipeId);
        const playerId = entityManager.generateId();
        const newPlayer = new Player(playerId, newPipe);
        this.players.push(newPlayer)
        return playerId;
    }

    public removePlayer(player:Player):void {
        const index = this.players.findIndex((elem:Player) => elem.getEntityId() === player.getEntityId());
        this.players.splice(index,1);
    }

    public getLobbyData(): LobbyData {

        const data: LobbyData = {
            lobbyId: this.getEntityId(),
            maxPlayers: this.maxPlayers,          
        }
        return data;
    }
    
}