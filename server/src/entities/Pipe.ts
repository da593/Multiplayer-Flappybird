import { PipeState_I } from "GameState/types";
import { Entity } from "./Entity";
import { INITIAL_STATE } from "@flappyblock/shared";

export class Pipe extends Entity {
    state: PipeState_I;  

    constructor(id:string) {
        super(id);
        this.state = INITIAL_STATE.pipe;
    }

    update(frameTime:number):PipeState_I {
        return this.state;
    }

    getState(): PipeState_I {
        return this.state;
    }

}