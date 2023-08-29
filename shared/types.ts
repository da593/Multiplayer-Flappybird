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
    hasCollided: boolean;
    playerId?: string;
}
  
export interface PipeState_I {
    gapCoords: BoxCoordinates;
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
    GetLatency: 'get-latency',
    CreateLobby: 'create-lobby',
    JoinLobby: 'join-lobby',
    LeaveLobby: 'leave-lobby',
    LobbyDataToAllClients: 'new-lobby-data',
    StartGame: 'start-game',
    UpdateGame: 'update-game',
    ResetGame: 'reset-game',
    EndGame: 'end-game',
    PlayerInput: 'player-input',
    Restart: 'restart-game',
    RestartRequested: 'restart-requested',
} as const;

export type Ack<ResponsePayload> = (payload: ResponsePayload) => void;
  
export interface ClientToServerEvents {
    [Events.CreateLobby]: (data: CreateLobbyArgs, cb:Ack<LobbyResponse>) => void;
    [Events.StartGame]: (data: StartGameArgs) => void;
    [Events.ResetGame]: (data: StartGameArgs) => void;
    [Events.JoinLobby]: (data: JoinLobbyArgs, cb:Ack<LobbyResponse>) => void;
    [Events.LeaveLobby]: (data: LeaveLobbyArgs) => void;
    [Events.PlayerInput]: (data: IdFields) => void;
}
    
export interface ServerToClientEvents {
    [Events.GetLatency]: (cb: () => void) => void;
    [Events.LobbyDataToAllClients]: (data: LobbyResponse) => void;
    [Events.StartGame]: (data: ReadyCheck) => void;
    [Events.ResetGame]: (data: ReadyCheck) => void;
    [Events.UpdateGame]: (data: GameData) => void;
    [Events.EndGame]: (data: EndGameData) => void;
}

export type ClientSocket = SocketIOClientSocket<ServerToClientEvents,ClientToServerEvents>;
export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ServerManager = Server<ClientToServerEvents, ServerToClientEvents>;

export interface GetLatencyResponse {
    now: number;
}

export interface IdFields {
    lobbyId: string;
    playerId: string;
}

export interface GameData {
    lobbyId: string;
    state: Record<string, GameState>;
}
  
export interface LobbyData {
      lobbyId: string;
      players: Array<string>
}
  
  
export type CreateLobbyArgs = {
    maxPlayers: number;
    socketId: string;
};
  
export interface LobbyResponse extends LobbyData {
    playerId: string;
}

export interface ClientLobbyResponse extends LobbyResponse {
    type: string;
}
  
export interface JoinLobbyArgs {
    lobbyId: string;
    socketId: string;
    playerId?: string;
}
  
export interface LeaveLobbyArgs {
    socketId: string;
}


export interface StartGameArgs {
    lobbyId: string;
    playerId: string;
}

export interface EndGameData {
    lobbyId: string;
    winner: string;
}

export interface ReadyCheck {
    numReady: number;
}

  