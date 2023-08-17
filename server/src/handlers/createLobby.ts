import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { Ack, CreateLobbyArgs, LobbyResponse } from "@flappyblock/shared";


export async function createLobby(args: CreateLobbyArgs, cb: Ack<LobbyResponse>): Promise<LobbyResponse> {
  const lobby = lobbyManager.createLobby(args.maxPlayers);
  const playerId = lobby.addPlayer();
  lobbyManager.addSocket(args.socketId, playerId, lobby.getEntityId());
  const data: LobbyResponse = {...lobby.getLobbyData(), playerId: playerId};
  cb(data);
  return data;
}