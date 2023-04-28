import { Coordinates,BoxCoordinates } from "./types";
import { GAME_DIMENSIONS } from "./constants";
import { randomizeYGapLocation } from "./randomizeGapFunc";


export const detectCollision = (birdCoords:BoxCoordinates, gapCoords:BoxCoordinates):boolean => {
    return birdCoords.botLeft.y >= GAME_DIMENSIONS.GAME_HEIGHT ||
    birdCoords.topRight.x >= gapCoords.topLeft.x && birdCoords.topLeft.x <= gapCoords.topRight.x && (
    birdCoords.topLeft.y <= gapCoords.topLeft.y ||
    birdCoords.botLeft.y >= gapCoords.botLeft.y)
    
}   

export const calculateGapCoords = (xPipeLoc: number, yGapLoc: number):BoxCoordinates => {
    const gapTopLeft:Coordinates = {x:xPipeLoc, y:yGapLoc};
    const gapTopRight:Coordinates = {x:xPipeLoc + GAME_DIMENSIONS.PIPE_WIDTH, y:yGapLoc};
    const gapBotLeft:Coordinates = {x:xPipeLoc, y:yGapLoc + GAME_DIMENSIONS.GAP_HEIGHT};
    const gapBotRight:Coordinates = {x:xPipeLoc + GAME_DIMENSIONS.PIPE_WIDTH, y:yGapLoc + GAME_DIMENSIONS.GAP_HEIGHT};
    return {topLeft:gapTopLeft,topRight: gapTopRight, botLeft: gapBotLeft, botRight: gapBotRight}
}

export const calculateBirdCoords = (yBirdLoc: number):BoxCoordinates => {
    const birdTopLeft:Coordinates = {x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: yBirdLoc};
    const birdTopRight:Coordinates = {x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y: yBirdLoc};
    const birdBotLeft:Coordinates = {x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: yBirdLoc + GAME_DIMENSIONS.BIRD_WIDTH};
    const birdBotRight:Coordinates = {x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y: yBirdLoc + GAME_DIMENSIONS.BIRD_WIDTH};
    return {topLeft:birdTopLeft,topRight: birdTopRight, botLeft: birdBotLeft, botRight: birdBotRight}
}

export const calculateNewGapCoords = (prevGapCoords: BoxCoordinates):BoxCoordinates => {
    let xPipeLoc:number = prevGapCoords.topLeft.x;
    let yGapLoc: number = prevGapCoords.topLeft.y;
    if (xPipeLoc <= -GAME_DIMENSIONS.PIPE_WIDTH) {
        yGapLoc = randomizeYGapLocation();
        xPipeLoc = GAME_DIMENSIONS.GAME_WIDTH;
    }
    else {
        xPipeLoc = prevGapCoords.topLeft.x - 1;
    }
    
    return calculateGapCoords(xPipeLoc,yGapLoc);
}

export const calculateNewBirdCoords = (prevGapCoords: BoxCoordinates) => {
    let yBirdLoc = prevGapCoords.topLeft.y;
    yBirdLoc = yBirdLoc + 1;
    return calculateBirdCoords(yBirdLoc);
}



