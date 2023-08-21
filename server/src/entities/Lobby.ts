import { LobbyData } from "@flappyblock/shared";
import { Game } from "#@/GameState/Game.js";
import { Entity } from "./Entity.js";
import { Player } from "./Player.js";
import { entityManager } from "#@/Managers/EntityManager.js";
import { Pipe } from "./Pipe.js";




export class Lobby extends Entity {
    players: Array<Player>;
    maxPlayers:number;
    game?:Game;

    constructor(id:string, maxPlayers:number) { 
        super(id);
        this.maxPlayers = maxPlayers;
        this.players = new Array();

    }

    public getNumPlayers(): number {
        return this.players.length;
    }

    public getLobbyData(): LobbyData {
        const players = this.players.map((player: Player) => player.getEntityId());
        const data: LobbyData = {
            lobbyId: this.getEntityId(),
            players: players
        }
        return data;
    }

    public getGame() {
        if (!this.game) {
            throw ("Game has not started");
        }
        return this.game;
    }
    
    public initalizeGame(): void {
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

    public removePlayer(playerId:string):void {
        const index = this.players.findIndex((elem:Player) => elem.getEntityId() === playerId);
        this.players.splice(index,1);
        this.game?.removePlayer(playerId);
    }


    
}