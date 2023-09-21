import { BoxCoordinates, GAME_DIMENSIONS, INITIAL_STATE, PipeState_I, PlayerState_I, calculateBirdCoords, calculateNewBirdCoords, detectCollision, game_tick } from "@flappyblock/shared";
import { Entity } from "./Entity.js";

export class Player extends Entity {
    birdCoords: BoxCoordinates;
    score: number;
    hasCollided: boolean;
    speed: number;
    readonly maxSpeed: number;
    
    constructor(id: string) {
        super(id);
        this.birdCoords = INITIAL_STATE.player.birdCoords;
        this.score = INITIAL_STATE.player.score;
        this.hasCollided = INITIAL_STATE.player.hasCollided;
        this.speed = 0;
        this.maxSpeed = 30;
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
        this.speed < this.maxSpeed ? this.speed += GAME_DIMENSIONS.BIRD_VELOCITY : null;
        this.birdCoords = calculateNewBirdCoords(currBirdCoords, this.speed);
    }
    
    resetState(): void {
        this.birdCoords = INITIAL_STATE.player.birdCoords;
        this.score = INITIAL_STATE.player.score;
        this.hasCollided = INITIAL_STATE.player.hasCollided;
        this.speed = 0;
    }


    userInput() {
        if (this.birdCoords.topLeft.y > 0 && !this.hasCollided) {
            this.speed = -GAME_DIMENSIONS.Y_FLY_UP;
            const newBirdCoords =  calculateNewBirdCoords(this.birdCoords, this.speed);
            this.birdCoords = newBirdCoords;
        }
    }

}