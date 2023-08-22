import { lobbyManager } from "#@/Managers/LobbyManager.js";

export function resetGame(lobbyId: string): void {
    const lobby = lobbyManager.getLobby(lobbyId);
    const game = lobby.getGame();
    game.restartGame();
}