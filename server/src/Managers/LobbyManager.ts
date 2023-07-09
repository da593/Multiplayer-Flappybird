import { Lobby } from "entities/Lobby";
import { EntityManager, entityManager } from "./EntityManager";


class LobbyManager {
    #lobbies: Map<String,Lobby>;
    entityManager: EntityManager;
    constructor(entityManager: EntityManager) {
        this.#lobbies = new Map();
        this.entityManager = entityManager;
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
        return lobby!;
    }

 
}

export const lobbyManager = new LobbyManager(entityManager);