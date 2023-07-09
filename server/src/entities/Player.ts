import { PlayerState_I } from "GameState/types";
import { Entity } from "./Entity";
import { INITAL_STATE } from "@flappyblock/shared";
import { Pipe } from "./Pipe";



export class Player extends Entity {
    state: PlayerState_I;
    pipe: Pipe;
    
    constructor(id:string, pipe: Pipe) {
        super(id);
        this.state = INITAL_STATE.player;
        this.pipe = pipe;
    }

    update(frameTime:number):PlayerState_I {
        return this.state;
    }
    
    getState(): PlayerState_I {
        return this.state;
    }

}