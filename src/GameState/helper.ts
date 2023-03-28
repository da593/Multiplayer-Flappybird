import { GAME_WIDTH, PIPE_WIDTH, GAP_HEIGHT, GAME_HEIGHT, BIRD_X_LOCATION, BIRD_WIDTH } from "./constants";
import { Coordinates,BoxCoordinates } from "./types";

export const randomizeYGapLocation = ():number => {
    return Math.floor(Math.random() * (GAME_HEIGHT - GAP_HEIGHT));
}

export const detectCollision = (birdCoords:BoxCoordinates, gapCoords:BoxCoordinates):boolean => {
    return birdCoords.botLeft.y >= GAME_HEIGHT ||
    birdCoords.topRight.x >= gapCoords.topLeft.x && birdCoords.topLeft.x <= gapCoords.topRight.x && (
    birdCoords.topLeft.y <= gapCoords.topLeft.y ||
    birdCoords.botLeft.y >= gapCoords.botLeft.y)
    
}   

export const calculateGapCoords = (xPipeLoc: number, yGapLoc: number):BoxCoordinates => {
    const gapTopLeft:Coordinates = {x:xPipeLoc, y:yGapLoc};
    const gapTopRight:Coordinates = {x:xPipeLoc + PIPE_WIDTH, y:yGapLoc};
    const gapBotLeft:Coordinates = {x:xPipeLoc, y:yGapLoc + GAP_HEIGHT};
    const gapBotRight:Coordinates = {x:xPipeLoc + PIPE_WIDTH, y:yGapLoc + GAP_HEIGHT};
    return {topLeft:gapTopLeft,topRight: gapTopRight, botLeft: gapBotLeft, botRight: gapBotRight}
}

export const calculateBirdCoords = (yBirdLoc: number):BoxCoordinates => {
    const birdTopLeft:Coordinates = {x: BIRD_X_LOCATION, y: yBirdLoc};
    const birdTopRight:Coordinates = {x: BIRD_X_LOCATION + BIRD_WIDTH, y: yBirdLoc};
    const birdBotLeft:Coordinates = {x: BIRD_X_LOCATION, y: yBirdLoc + BIRD_WIDTH};
    const birdBotRight:Coordinates = {x: BIRD_X_LOCATION + BIRD_WIDTH, y: yBirdLoc + BIRD_WIDTH};
    return {topLeft:birdTopLeft,topRight: birdTopRight, botLeft: birdBotLeft, botRight: birdBotRight}
}

export const calculateNewGapCoords = (prevGapCoords: BoxCoordinates, frameCount:number):BoxCoordinates => {
    let xPipeLoc:number = prevGapCoords.topLeft.x;
    let yGapLoc: number = prevGapCoords.topLeft.y;

    if (xPipeLoc <= -PIPE_WIDTH) {
        yGapLoc = randomizeYGapLocation();
        xPipeLoc = GAME_WIDTH;
    }
    else {
        xPipeLoc = prevGapCoords.topLeft.x - frameCount;
    }
    
    return calculateGapCoords(xPipeLoc,yGapLoc);
}

export const calculateNewBirdCoords = (prevGapCoords: BoxCoordinates, frameCount:number, hasKeyClicked:boolean) => {
    let yBirdLoc = prevGapCoords.topLeft.y;
    if (hasKeyClicked === true && yBirdLoc > 0) {
        yBirdLoc = yBirdLoc - 40;
    }
    else {
        yBirdLoc = yBirdLoc + frameCount;
    }
    return calculateBirdCoords(yBirdLoc);
}



