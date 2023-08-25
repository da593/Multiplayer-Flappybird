import { GameData } from "@flappyblock/shared";
import { lobbyManager } from "#@/Managers/LobbyManager.js";

export async function updateGame(lobbyId: string): Promise<GameData> {
    const lobby = lobbyManager.getLobby(lobbyId);
    if (lobby) {
        const game = lobby.getGame();
        const data = {lobbyId: lobbyId, state: game.getState()};
        return data;
    }
    return {
        lobbyId: "NO_LOBBY_FOUND",
        state: {}
    }
}