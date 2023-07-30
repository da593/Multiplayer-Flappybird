import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { Ack, CreateLobbyArgs, CreateLobbyResponse } from "@flappyblock/shared";


export async function createLobby(args: CreateLobbyArgs, cb: Ack<CreateLobbyResponse>): Promise<CreateLobbyResponse> {
  const lobby = lobbyManager.createLobby(args.maxPlayers);
  const playerId = lobby.addPlayer();
  lobbyManager.addSocket(args.socketId, playerId, lobby.getEntityId());
  const data: CreateLobbyResponse = {...lobby.getLobbyData(), playerId: playerId};
  cb(data);
  return data;
}