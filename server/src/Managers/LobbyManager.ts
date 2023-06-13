import { Lobby } from "entities/Lobby";
import { IdManager, idManager } from "./IdManager";
import { Player } from "entities/Player";
import { Pipe } from "entities/Pipe";



class LobbyManager {
    #lobbies: Map<String,Lobby>;
    idManager: IdManager;
    constructor(IdManager:IdManager) {
        this.#lobbies = new Map();
        this.idManager = IdManager;
    }


    public createLobby(maxPlayer:number) {
        const lobbyId = this.idManager.generateId();
        const newLobby = new Lobby(lobbyId,maxPlayer);
        this.#lobbies.set(lobbyId, newLobby);
        this.addPlayer(newLobby);
    }

    public joinLobby(lobbyId:String,playerId:String) {
        if (this.#lobbies.has(lobbyId)) {
            const lobby = this.#lobbies.get(lobbyId);
            if (lobby) {
                this.addPlayer(lobby);
            }
        }
    }

    public removeLobby(id:String) {
        this.#lobbies.delete(id);

    }

    public getLobby(id:String):Lobby | undefined {
        return this.#lobbies.get(id);
    }

    private createPlayer():Player {
        const playerId = this.idManager.generateId();
        const player = new Player(playerId);
        return player;
    }

    private createPipe():Pipe {
        const pipeId = this.idManager.generateId();
        const pipe = new Pipe(pipeId);
        return pipe;
    }

    private addPlayer(lobby:Lobby):void {
        const player = this.createPlayer();
        const pipe = this.createPipe();
        lobby.addPlayer(player,pipe);
    }
    
}

export const lobbyManager = new LobbyManager(idManager);