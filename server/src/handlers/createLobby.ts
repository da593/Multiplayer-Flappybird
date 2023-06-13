import { lobbyManager } from "Managers/LobbyManager";
import { CreateLobbyResponse } from "./types";

export async function createLobby(maxPlayers:number):CreateLobbyResponse {
    lobbyManager.createLobby(maxPlayers);
    
  }