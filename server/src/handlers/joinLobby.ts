import { lobbyManager } from "Managers/LobbyManager";
import { Ack, JoinLobbyArgs, JoinLobbyResponse } from "@flappyblock/shared";

export async function joinLobby(args: JoinLobbyArgs): Promise<JoinLobbyResponse> {
    const lobby = lobbyManager.getLobby(args.lobbyId);
    const playerId = lobby.addPlayer();
    const data: JoinLobbyResponse = {...lobby.getLobbyData(), playerId: playerId};
    return data;
}