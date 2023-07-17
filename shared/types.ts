import { Socket as SocketIOClientSocket } from 'socket.io-client';
import { Server, Socket } from 'socket.io';

export interface Coordinates {
    x: number;
    y: number;
}
  
export interface BoxCoordinates {
    topLeft: Coordinates;
    topRight: Coordinates;
    botLeft: Coordinates;
    botRight: Coordinates;
}

export interface PlayerState_I {
    birdCoords: BoxCoordinates;
    score: number;
    playerId?: string;
}
  
export interface PipeState_I {
    gapCoords: BoxCoordinates;
    hasCollided: boolean;
}

export interface GameState {
    player: PlayerState_I
    pipe: PipeState_I
}
  
export interface Dimensions_I {
    GAME_WIDTH: number,
    GAME_HEIGHT: number,
    PIPE_WIDTH: number,
    GAP_HEIGHT: number,
    PIPE_VELOCITY: number,
    BIRD_WIDTH: number,
    BIRD_X_LOCATION: number,
    Y_FLY_UP: number,
}


export const Events = {
    CreateLobby: 'create-lobby',
    StartGame: 'start-game',
    JoinLobby: 'join-lobby',
    Restart: 'restart-game',
    RestartRequested: 'restart-requested',
} as const;

export type Ack<ResponsePayload> = (payload: ResponsePayload) => void;
  
export interface ClientToServerEvents {
    [Events.CreateLobby]: (data: CreateLobbyArgs, cb:Ack<CreateLobbyResponse>) => void;
    [Events.StartGame]: (data:StartGameArgs) => void;
    [Events.JoinLobby]: (data: JoinLobbyArgs, cb:Ack<JoinLobbyResponse>) => void;
}
    
export interface ServerToClientEvents {
    [Events.JoinLobby]: (data: JoinLobbyResponse) => void;
    [Events.StartGame]: () => void;
}

export type ClientSocket = SocketIOClientSocket<ServerToClientEvents,ClientToServerEvents>;
export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ServerManager = Server<ClientToServerEvents, ServerToClientEvents>;


export interface IdFields {
    lobbyId: string;
    playerId: string;
}
  
export interface LobbyData {
      lobbyId: string;
      players: Array<string>
}
  
  
export type CreateLobbyArgs = {
    maxPlayers: number;
};
  
export interface CreateLobbyResponse extends LobbyData {
    playerId: string;
}
  
export interface JoinLobbyArgs {
    lobbyId: string;
    playerId?: string;
}
  
export interface JoinLobbyResponse extends LobbyData {
      playerId: string;
}


export interface StartGameArgs {
    lobbyId: string;
}
  