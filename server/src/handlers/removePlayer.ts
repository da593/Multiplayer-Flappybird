import { lobbyManager } from "Managers/LobbyManager.js";

export function removePlayer(socketId: string): void {
    lobbyManager.removePlayer(socketId);
}