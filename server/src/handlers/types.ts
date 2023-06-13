import { Player } from "entities/Player";

export type CreateLobbyResponse = {
    lobbyId: string;
    playerId: string;
  };

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}
  
export interface ClientToServerEvents {
    hello: () => void;
    createLobby:() => void;
}
  
 
export interface SocketData {
    lobbyId: string;
    players: Array<Player>;
}