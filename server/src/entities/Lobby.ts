import { LobbyData, ReadyCheck } from "@flappyblock/shared";
import { Game } from "#@/GameState/Game.js";
import { Entity } from "./Entity.js";
import { Player } from "./Player.js";
import { entityManager } from "#@/Managers/EntityManager.js";
import { Pipe } from "./Pipe.js";




export class Lobby extends Entity {
    players: Array<Player>;
    maxPlayers:number;
    game: Game;

    constructor(id:string, maxPlayers:number) { 
        super(id);
        this.maxPlayers = maxPlayers;
        this.players = new Array();
        const pipeId = entityManager.generateId();
        const pipe = new Pipe(pipeId);
        this.game = new Game(pipe);
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

    public startGame(playerId: string): ReadyCheck {
        if (this.game.getNumPlayers() <= 0 || this.players.length <= 0) {
            throw ("No players to start game");
        }
        else if (this.game.getNumPlayers() > this.maxPlayers || this.players.length > this.maxPlayers) {
            throw ("Too many players to start game");
        }
        else {
            return this.game.startGame(playerId);
        }
    }
    
    public addPlayer(): string {
        if (this.players.length >= this.maxPlayers) {
            throw("Lobby is full");
        }
        else if (this.game.hasStarted) {
            return "NO_PLAYER"
        }
        else {
            const playerId = entityManager.generateId();
            const newPlayer = new Player(playerId);
            this.players.push(newPlayer);
            this.game?.addPlayer(newPlayer);
            return playerId;
        }
    }

    public removePlayer(playerId:string):void {
        const index = this.players.findIndex((elem:Player) => elem.getEntityId() === playerId);
        this.players.splice(index,1);
        this.game?.removePlayer(playerId);
       
    }

}