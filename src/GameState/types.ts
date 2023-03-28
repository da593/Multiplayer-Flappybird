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

export interface GameSizeProps {
    width: number;
    height: number
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
}

