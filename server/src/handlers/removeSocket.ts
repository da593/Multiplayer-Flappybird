import { lobbyManager } from "Managers/LobbyManager";

export function removeSocket(id: string) {
    lobbyManager.removeSocket(id);
}