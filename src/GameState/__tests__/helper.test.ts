import { GAME_DIMENSIONS } from "GameState/constants";
import { calculateBirdCoords, calculateGapCoords, calculateNewBirdCoords, calculateNewGapCoords, detectCollision, randomizeYGapLocation } from "GameState/helper";
import { BoxCoordinates } from "GameState/types";

const birdAtCeiling:BoxCoordinates = {
    topLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: 0}, 
    topRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y: 0}, 
    botLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: GAME_DIMENSIONS.BIRD_WIDTH}, 
    botRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y:  GAME_DIMENSIONS.BIRD_WIDTH}
};

const gapAtRight:BoxCoordinates = {
    topLeft:{x: GAME_DIMENSIONS.GAME_WIDTH, y: GAME_DIMENSIONS.GAME_HEIGHT / 2}, 
    topRight:{x: GAME_DIMENSIONS.GAME_WIDTH + GAME_DIMENSIONS.PIPE_WIDTH, y: GAME_DIMENSIONS.GAME_HEIGHT / 2}, 
    botLeft:{x:  GAME_DIMENSIONS.GAME_WIDTH, y: GAME_DIMENSIONS.GAME_HEIGHT / 2 + GAME_DIMENSIONS.GAP_HEIGHT}, 
    botRight:{x: GAME_DIMENSIONS.GAME_WIDTH + GAME_DIMENSIONS.PIPE_WIDTH, y: GAME_DIMENSIONS.GAME_HEIGHT / 2 + GAME_DIMENSIONS.GAP_HEIGHT}
};

const pipeAtBird:BoxCoordinates = {
    topLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: GAME_DIMENSIONS.GAME_HEIGHT / 2}, 
    topRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.PIPE_WIDTH, y: GAME_DIMENSIONS.GAME_HEIGHT / 2}, 
    botLeft:{x:  GAME_DIMENSIONS.BIRD_X_LOCATION, y: GAME_DIMENSIONS.GAME_HEIGHT / 2 + GAME_DIMENSIONS.GAP_HEIGHT}, 
    botRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.PIPE_WIDTH, y: GAME_DIMENSIONS.GAME_HEIGHT / 2 + GAME_DIMENSIONS.GAP_HEIGHT}
};

const gapAtBird:BoxCoordinates = {
    topLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: -5}, 
    topRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.PIPE_WIDTH, y: -5}, 
    botLeft:{x:  GAME_DIMENSIONS.BIRD_X_LOCATION, y:  -5 + GAME_DIMENSIONS.GAP_HEIGHT}, 
    botRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.PIPE_WIDTH, y: -5 + GAME_DIMENSIONS.GAP_HEIGHT}
};

const gapOffScreen:BoxCoordinates = {
    topLeft:{x: -GAME_DIMENSIONS.PIPE_WIDTH, y: -5}, 
    topRight:{x: 0, y: -5}, 
    botLeft:{x: -GAME_DIMENSIONS.PIPE_WIDTH, y:  -5 + GAME_DIMENSIONS.GAP_HEIGHT}, 
    botRight:{x: 0, y: -5 + GAME_DIMENSIONS.GAP_HEIGHT}
};

test("no collision when bird hits top of box", () => {
    expect(detectCollision(birdAtCeiling, gapAtRight)).toBe(false);
});

test("no collision when bird is in gap", () => {
    expect(detectCollision(birdAtCeiling, gapAtBird)).toBe(false);
});

test("collision when bird hits pipe", () => {
    expect(detectCollision(birdAtCeiling, pipeAtBird)).toBe(true);
});

test("calculate bird coordinates given bird x location", () => {
    expect(calculateBirdCoords(0)).toEqual(birdAtCeiling);
});

test("calculate gap coordinates given x and y location", () => {
    expect(calculateGapCoords(GAME_DIMENSIONS.BIRD_X_LOCATION, -5)).toEqual(gapAtBird);
});


test("calculate new bird coordinates given previous coordinates", () => {
    expect(calculateNewBirdCoords(birdAtCeiling)).toEqual({
        topLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: 1}, 
        topRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y: 1}, 
        botLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: GAME_DIMENSIONS.BIRD_WIDTH + 1}, 
        botRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y:  GAME_DIMENSIONS.BIRD_WIDTH + 1}
    });
});

test("calculate new gap coordinates given previous coordinates", () => {
    expect(calculateNewGapCoords(gapAtBird)).toEqual({
        topLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION - 1, y: -5}, 
        topRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.PIPE_WIDTH  - 1, y: -5}, 
        botLeft:{x:  GAME_DIMENSIONS.BIRD_X_LOCATION - 1, y:  -5 + GAME_DIMENSIONS.GAP_HEIGHT}, 
        botRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.PIPE_WIDTH - 1, y: -5 + GAME_DIMENSIONS.GAP_HEIGHT}
    });

    expect(calculateNewGapCoords(gapOffScreen)).toMatchObject({
        topLeft:{x: GAME_DIMENSIONS.GAME_WIDTH},
        topRight:{x: GAME_DIMENSIONS.GAME_WIDTH + GAME_DIMENSIONS.PIPE_WIDTH}, 
        botLeft:{x:  GAME_DIMENSIONS.GAME_WIDTH}, 
        botRight:{x: GAME_DIMENSIONS.GAME_WIDTH + GAME_DIMENSIONS.PIPE_WIDTH}
    });
});

