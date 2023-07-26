import { lobbyManager } from "Managers/LobbyManager";

export function playerInput(lobbyId: string, playerId: string): void {
    const lobby = lobbyManager.getLobby(lobbyId);
    const game = lobby.getGame();
    game.playerInput(playerId);
}