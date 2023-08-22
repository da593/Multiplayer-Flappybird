import { Entity } from "./Entity.js";
import { BoxCoordinates, INITIAL_STATE, PipeState_I, calculateNewGapCoords } from "@flappyblock/shared";

export class Pipe extends Entity {
    position: BoxCoordinates;  

    constructor(id:string) {
        super(id);
        this.position = INITIAL_STATE.pipe.gapCoords;
    }

    update(): void {
        this.position = calculateNewGapCoords(this.position);
    }

    getState(): PipeState_I {
        return {gapCoords: this.position};
    }
    
    resetState(): void {
        this.position = INITIAL_STATE.pipe.gapCoords;
    }

}