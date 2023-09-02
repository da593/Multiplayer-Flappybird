import { calculateBirdCoords, calculateGapCoords, randomizeYGapLocation } from "./game";
import { Dimensions_I, GameState } from "./types";

 
export const GAME_DIMENSIONS:Dimensions_I = {
    GAME_WIDTH: 480,
    GAME_HEIGHT: 640,
    PIPE_WIDTH: 80,
    GAP_HEIGHT: 120,
    PIPE_VELOCITY: -0.05,
    BIRD_WIDTH: 40,
    BIRD_X_LOCATION: 50,
    Y_FLY_UP: 45,
};

export const INITIAL_STATE: GameState =  {
    player: {
        birdCoords: calculateBirdCoords(GAME_DIMENSIONS.GAP_HEIGHT / 3 ),
        score: 0,
        hasCollided: false,
    },
    pipe: {
        gapCoords: calculateGapCoords(GAME_DIMENSIONS.GAME_WIDTH, randomizeYGapLocation()),
    },
}

export const game_tick: number = 50;
export const ping_rate: number = 25000;

export const KEYBINDS: Array<string> = ["w","ArrowUp"]

export enum WinState {
    NO_WINNER = "NO WINNER",
    DRAW = "DRAW",
    SELF_WIN = "YOU WIN",
    OPPONENT_WIN = "OPPONENT WINS",
}

export enum ERROR {
    LOBBY_NOT_FOUND = "LOBBY_NOT_FOUND",
    NO_PLAYER = "NO_PLAYER",
}