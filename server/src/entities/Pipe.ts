import { PipeState_I } from "GameState/types";
import { Entity } from "./Entity";
import { INITAL_STATE } from "@flappyblock/shared";

export class Pipe extends Entity {
    state: PipeState_I;  

    constructor(id:string) {
        super(id);
        this.state = INITAL_STATE.pipe;
    }

    update(frameTime:number):PipeState_I {
        return this.state;
    }

    getState(): PipeState_I {
        return this.state;
    }

}