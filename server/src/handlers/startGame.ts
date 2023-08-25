import { lobbyManager } from "#@/Managers/LobbyManager.js";
import { ReadyCheck, StartGameArgs } from "@flappyblock/shared";
import { resetGame } from "./resetGame";

export function startGame({lobbyId, playerId}: StartGameArgs): ReadyCheck {
    const lobby = lobbyManager.getLobby(lobbyId);
    let readyCheck = {numReady: 0};
    if (lobby) {
        readyCheck = lobby.startGame(playerId);
    }
    return readyCheck;
}