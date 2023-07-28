import { lobbyManager } from "Managers/LobbyManager.js";
import { Ack, JoinLobbyArgs, JoinLobbyResponse } from "@flappyblock/shared";

export async function joinLobby(args: JoinLobbyArgs, cb: Ack<JoinLobbyResponse>): Promise<JoinLobbyResponse> {
    const lobby = lobbyManager.getLobby(args.lobbyId);
    const playerId = lobby.addPlayer();
    lobbyManager.addSocket(args.socketId, playerId, lobby.getEntityId());
    const data: JoinLobbyResponse = {...lobby.getLobbyData(), playerId: playerId};
    cb(data);
    return data;
}