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

export interface GameState_I {
    gapCoords: BoxCoordinates;
    birdCoords: BoxCoordinates;
    score: number;
    hasCollided: boolean;
}

export interface PlayerCount_I {
    players: number,
}


export interface GapCoordProps {
    gapCoords: BoxCoordinates;
}

export interface BirdCoordProps {
    birdCoords:BoxCoordinates;
}

export interface ScoreProps {
    score: number
}



