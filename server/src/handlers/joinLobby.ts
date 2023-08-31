import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { Ack, ERROR, JoinLobbyArgs, LobbyResponse } from "@flappyblock/shared";

export async function joinLobby(args: JoinLobbyArgs, cb: Ack<LobbyResponse>): Promise<LobbyResponse> {
    const lobby = lobbyManager.getLobby(args.lobbyId);
    let data: LobbyResponse = {
        lobbyId: ERROR.LOBBY_NOT_FOUND,
        players: [],
        playerId: ERROR.NO_PLAYER
    }
    if (lobby && !lobby.getGame().hasStarted) {
        const playerId = lobby.addPlayer();
        lobbyManager.addSocket(args.socketId, playerId, lobby.getEntityId());
        data = {...lobby.getLobbyData(), playerId: playerId};
    }
    cb(data);
    return data;
}