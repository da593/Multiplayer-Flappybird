import { lobbyManager } from "#@/Managers/LobbyManager.js";

export function startGame(lobbyId: string): void {
    const lobby = lobbyManager.getLobby(lobbyId);
    lobby.startGame();
}