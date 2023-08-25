import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { ReadyCheck, StartGameArgs } from "@flappyblock/shared";

export function resetGame({lobbyId, playerId}: StartGameArgs): ReadyCheck {
    const lobby = lobbyManager.getLobby(lobbyId);
    let readyCheck = {
        numReady: 0,
    }
    if (lobby) {
        const game = lobby.getGame();
        readyCheck = game.restartGame(playerId);
    }
    return readyCheck;
}