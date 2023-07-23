import { Entity } from "./Entity";
import { BoxCoordinates, INITIAL_STATE, PipeState_I, PlayerState_I, calculateNewBirdCoords, detectCollision } from "@flappyblock/shared";
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
        this.hasCollided = detectCollision(this.birdCoords, this.getPipeState().gapCoords)
        this.birdCoords = calculateNewBirdCoords(this.birdCoords);
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

    addScore(): void {
        this.score++;
    }

}