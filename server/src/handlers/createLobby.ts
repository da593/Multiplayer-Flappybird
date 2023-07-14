import { lobbyManager } from "Managers/LobbyManager";
import { Ack, CreateLobbyArgs, CreateLobbyResponse } from "@flappyblock/shared";


export async function createLobby(args: CreateLobbyArgs, cb: Ack<CreateLobbyResponse>): Promise<CreateLobbyResponse> {
  const lobby = lobbyManager.createLobby(args.maxPlayers);
  const playerId = lobby.addPlayer();
  const data: CreateLobbyResponse = {...lobby.getLobbyData(), playerId: playerId};
  cb(data);
  return data;
}