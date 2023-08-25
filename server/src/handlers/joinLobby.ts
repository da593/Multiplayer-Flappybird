import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { Ack, JoinLobbyArgs, LobbyResponse } from "@flappyblock/shared";

export async function joinLobby(args: JoinLobbyArgs, cb: Ack<LobbyResponse>): Promise<LobbyResponse> {
    const lobby = lobbyManager.getLobby(args.lobbyId);
    if (lobby && !lobby.getGame().hasStarted) {
        const playerId = lobby.addPlayer();
        lobbyManager.addSocket(args.socketId, playerId, lobby.getEntityId());
        const data: LobbyResponse = {...lobby.getLobbyData(), playerId: playerId};
        cb(data);
        return data;
    }
    return {
        lobbyId: "NO_LOBBY_FOUND",
        players: [],
        playerId: "NO_PLAYER"
    }
    
}