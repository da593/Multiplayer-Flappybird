import { BoxCoordinates, GAME_DIMENSIONS, INITIAL_STATE, PipeState_I, PlayerState_I, calculateBirdCoords, calculateNewBirdCoords, detectCollision } from "@flappyblock/shared";
import { Entity } from "./Entity.js";

export class Player extends Entity {
    birdCoords: BoxCoordinates;
    score: number;
    hasCollided: boolean;
    
    constructor(id: string) {
        super(id);
        this.birdCoords = INITIAL_STATE.player.birdCoords;
        this.score = INITIAL_STATE.player.score;
        this.hasCollided = INITIAL_STATE.player.hasCollided;
    }

    getPlayerState(): PlayerState_I {
        return {
            birdCoords: this.birdCoords,
            score: this.score,
            hasCollided: this.hasCollided,
            playerId: this.getEntityId()
        };
    }

    getBirdCoords(): BoxCoordinates {
        return this.birdCoords;
    }

    getHasCollided(): boolean {
        return this.hasCollided;
    }

    getScore(): number {
        return this.score;
    }

    setHasCollided(bool: boolean): void {
        this.hasCollided = bool;
    }

    addScore(): void {
        this.score++;
    }

    update(): void {
        const currBirdCoords = this.birdCoords;
        this.birdCoords = calculateNewBirdCoords(currBirdCoords);
    }
    
    resetState(): void {
        this.birdCoords = INITIAL_STATE.player.birdCoords;
        this.score = INITIAL_STATE.player.score;
        this.hasCollided = INITIAL_STATE.player.hasCollided;
    }


    userInput() {
        if (this.birdCoords.topLeft.y > 0 && !this.hasCollided) {
            const newBirdCoords =  calculateBirdCoords(this.birdCoords.topLeft.y - GAME_DIMENSIONS.Y_FLY_UP);
            this.birdCoords = newBirdCoords;
        }
    }

}