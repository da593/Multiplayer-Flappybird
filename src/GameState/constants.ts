import { calculateBirdCoords, calculateGapCoords, randomizeYGapLocation } from "./helper";
import { Dimensions_I, InitalState_I } from "./types";

export const GAME_DIMENSIONS:Dimensions_I = {
    GAME_WIDTH: 480,
    GAME_HEIGHT: 640,
    PIPE_WIDTH: 100,
    GAP_HEIGHT: 125,
    PIPE_VELOCITY: -0.05,
    BIRD_WIDTH: 50,
    BIRD_X_LOCATION: 50,
    Y_FLY_UP: 25,
};

export  const INITAL_STATE:InitalState_I =  {
    gapCoords: calculateGapCoords(GAME_DIMENSIONS.GAME_WIDTH, randomizeYGapLocation()),
    birdCoords: calculateBirdCoords(GAME_DIMENSIONS.GAP_HEIGHT / 3),
    hasCollided: false,
    hasKeyClicked: false,
    score: 0,
}