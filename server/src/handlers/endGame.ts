import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { EndGameData, WinState } from "@flappyblock/shared";

export async function endGame(lobbyId: string): Promise<EndGameData> {
    const lobby = lobbyManager.getLobby(lobbyId);
    if (lobby) {
        const game = lobby.getGame();
        const data: EndGameData = {
            lobbyId: lobby.getEntityId(),
            winner: game.getWinner(),
        }
        return data;
    }
    return {
        lobbyId: "NO_LOBBY_FOUND",
        winner: WinState.NO_WINNER
    }
}