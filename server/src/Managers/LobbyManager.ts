import { Lobby } from "entities/Lobby.js";
import { EntityManager, entityManager } from "./EntityManager.js";
import { IdFields } from "@flappyblock/shared";


class LobbyManager {
    #lobbies: Map<String,Lobby>;
    entityManager: EntityManager;
    socketToIds: Map<string, IdFields>;
    constructor(entityManager: EntityManager) {
        this.#lobbies = new Map();
        this.entityManager = entityManager;
        this.socketToIds = new Map();
    }


    public createLobby(maxPlayer:number):Lobby {
        const lobbyId = this.entityManager.generateId();
        const newLobby = new Lobby(lobbyId, maxPlayer);
        this.#lobbies.set(lobbyId, newLobby);
        return newLobby;
    }

    public removeLobby(id:string) {
        this.#lobbies.delete(id);

    }

    public getLobby(id:string): Lobby {
        const lobby = this.#lobbies.get(id);
        if (!lobby) {
            throw ("Lobby does not exist");
        }
        return lobby;
    }

    public addSocket(socketId: string, playerId: string, lobbyId: string) {
        this.socketToIds.set(socketId, {playerId, lobbyId})
    }

    public removeSocket(socketId: string) {
        this.removePlayer(socketId);
        this.socketToIds.delete(socketId);
    }

    public removePlayer(socketId: string) {
        const idFields = this.socketToIds.get(socketId);
        if (idFields) {
            const {playerId, lobbyId} = idFields;
            const lobby = this.getLobby(idFields.lobbyId);
            lobby.removePlayer(playerId);
            if (lobby.getNumPlayers() <= 0) {
                this.#lobbies.delete(lobbyId);
            }
        }
    }

}

export const lobbyManager = new LobbyManager(entityManager);