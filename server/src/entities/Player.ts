import { Entity } from "./Entity";
import { BoxCoordinates, GAME_DIMENSIONS, INITIAL_STATE, PipeState_I, PlayerState_I, calculateBirdCoords, calculateNewBirdCoords, detectCollision } from "@flappyblock/shared";
import { Pipe } from "./Pipe";


export class Player extends Entity {
    birdCoords: BoxCoordinates;
    score: number;
    hasCollided: boolean;
    pipe: Pipe;
    
    constructor(id:string, pipe: Pipe) {
        super(id);
        this.birdCoords = INITIAL_STATE.player.birdCoords;
        this.score = INITIAL_STATE.player.score;
        this.hasCollided = INITIAL_STATE.player.hasCollided;
        this.pipe = pipe;
    }

    update(): void {
        const currPipeCoords = this.getPipeState().gapCoords;
        const currBirdCoords = this.birdCoords;
        this.hasCollided = detectCollision(this.birdCoords, currPipeCoords);
        this.addScore(currBirdCoords, currPipeCoords);
        this.birdCoords = calculateNewBirdCoords(currBirdCoords);
        this.pipe.update();
    }
    
    getPlayerState(): PlayerState_I {
        return {
            birdCoords: this.birdCoords,
            score: this.score,
            hasCollided: this.hasCollided,
            playerId: this.getEntityId()
        };
    }

    getPipeState(): PipeState_I {
        return this.pipe.getState();
    }

    addScore(birdCoords: BoxCoordinates, pipeCoords: BoxCoordinates): void {
        if (birdCoords.topLeft.x === pipeCoords.topRight.x + 1) {
            this.score++;
        }
    }
    
    userInput() {
        if (this.birdCoords.topLeft.y > 0 && !this.hasCollided) {
            const newBirdCoords =  calculateBirdCoords(this.birdCoords.topLeft.y - GAME_DIMENSIONS.Y_FLY_UP);
            this.birdCoords = newBirdCoords;
        }
    }

}