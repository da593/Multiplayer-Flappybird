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
}

export interface PipeState_I {
    gapCoords: BoxCoordinates;
    hasCollided: boolean;
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

