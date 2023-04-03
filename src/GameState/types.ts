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

export interface InitalState_I {
    gapCoords: BoxCoordinates;
    birdCoords: BoxCoordinates;
    hasCollided: boolean;
    hasKeyClicked: boolean;
    score: number;
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

export interface CollisionProps {
    hasCollided: boolean;
    hasReset?:boolean;
    handleReset?: () => void;
}

