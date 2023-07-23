import { lobbyManager } from "Managers/LobbyManager";

export function startGame(lobbyId: string): void {
    const lobby = lobbyManager.getLobby(lobbyId);
    lobby.initalizeGame();
    const game = lobby.getGame();
    game.setEndGame(false);
    game.updateGame();

}