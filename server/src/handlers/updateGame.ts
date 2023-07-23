import { GameData } from "@flappyblock/shared";
import { lobbyManager } from "Managers/LobbyManager";

export async function updateGame(lobbyId: string): Promise<GameData> {
    const lobby = lobbyManager.getLobby(lobbyId);
    const game = lobby.getGame();
    const data = {lobbyId: lobbyId, state: game.getState()};
    return data;
}