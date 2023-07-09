import { calculateBirdCoords, calculateGapCoords, randomizeYGapLocation } from "./game";
import { Dimensions_I, GameState } from "./types";

 
export const GAME_DIMENSIONS:Dimensions_I = {
    GAME_WIDTH: 540,
    GAME_HEIGHT: 640,
    PIPE_WIDTH: 100,
    GAP_HEIGHT: 125,
    PIPE_VELOCITY: -0.05,
    BIRD_WIDTH: 50,
    BIRD_X_LOCATION: 50,
    Y_FLY_UP: 45,
};

export const INITAL_STATE: GameState =  {
    player: {
        birdCoords: calculateBirdCoords(GAME_DIMENSIONS.GAP_HEIGHT / 3 ),
        score: 0,
    },
    pipe: {
        gapCoords: calculateGapCoords(GAME_DIMENSIONS.GAME_WIDTH, randomizeYGapLocation()),
        hasCollided: false,
    },

}

export const KEYBINDS:string[] = ["w","ArrowUp"]