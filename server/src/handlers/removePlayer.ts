import { lobbyManager } from "Managers/LobbyManager";

export function removePlayer(socketId: string): void {
    lobbyManager.removePlayer(socketId);
}