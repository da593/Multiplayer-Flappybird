import { IdFields, LobbyData } from "@flappyblock/shared";
import { Lobby } from "#@/entities/Lobby.js";
import { EntityManager, entityManager } from "./EntityManager.js";

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

    public getLobby(id:string): Lobby | undefined {
        return this.#lobbies.get(id);;
    }

    public addSocket(socketId: string, playerId: string, lobbyId: string) {
        this.socketToIds.set(socketId, {playerId, lobbyId})
    }

    public removeSocket(socketId: string): LobbyData {
        const data = this.removePlayer(socketId);
        this.socketToIds.delete(socketId);
        return data;
        
    }

    private removePlayer(socketId: string): LobbyData {
        const idFields = this.socketToIds.get(socketId);
        let data: LobbyData = {
            lobbyId: "NO_LOBBY_FOUND",
            players: [],
        }
        if (idFields) {
            const {playerId, lobbyId} = idFields;
            const lobby = this.getLobby(idFields.lobbyId);
            if (lobby) {
                lobby.removePlayer(playerId);
                if (lobby.getNumPlayers() <= 0) {
                    lobby.getGame().setShouldEnd(true);
                    this.#lobbies.delete(lobbyId);
                    entityManager.deleteId(lobbyId);
                }
                else {
                    data = {
                        ...lobby.getLobbyData(),
                    }
                }
                entityManager.deleteId(playerId);
            }
        }
        return data;
    }
}

export const lobbyManager = new LobbyManager(entityManager);