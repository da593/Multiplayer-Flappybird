import { lobbyManager } from "#@/Managers/LobbyManager.js";

export function removeSocket(id: string) {
    lobbyManager.removeSocket(id);
}