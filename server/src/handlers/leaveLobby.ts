import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { Ack, JoinLobbyArgs, LeaveLobbyArgs, LobbyResponse } from "@flappyblock/shared";

export async function leaveLobby({socketId}: LeaveLobbyArgs): Promise<LobbyResponse> {
    const lobbyData = lobbyManager.removeSocket(socketId);
    const data: LobbyResponse = {...lobbyData, playerId: "NO_PLAYER"};
    return data;
}