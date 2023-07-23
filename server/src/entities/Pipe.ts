import { Entity } from "./Entity";
import { BoxCoordinates, INITIAL_STATE, PipeState_I, calculateNewGapCoords } from "@flappyblock/shared";

export class Pipe extends Entity {
    position: BoxCoordinates;  

    constructor(id:string) {
        super(id);
        this.position = INITIAL_STATE.pipe.gapCoords;
    }

    update(): void {
        this.position = calculateNewGapCoords(this.position);
        console.log("pipe update");
    }

    getState(): PipeState_I {
        return {gapCoords: this.position};
    }

}