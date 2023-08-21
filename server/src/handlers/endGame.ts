import { lobbyManager } from "#@/Managers/LobbyManager";
import { EndGameData } from "@flappyblock/shared";

export async function endGame(lobbyId: string): Promise<EndGameData> {
    const lobby = lobbyManager.getLobby(lobbyId);
    const game = lobby.getGame();
    const data: EndGameData = {
        lobbyId: lobby.getEntityId(),
        winner: game.getWinner(),
    }
    return data;
    
}