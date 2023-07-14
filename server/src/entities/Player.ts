import { PlayerState_I } from "GameState/types";
import { Entity } from "./Entity";
import { INITIAL_STATE, PipeState_I } from "@flappyblock/shared";
import { Pipe } from "./Pipe";



export class Player extends Entity {
    state: PlayerState_I;
    pipe: Pipe;
    
    constructor(id:string, pipe: Pipe) {
        super(id);
        this.state = INITIAL_STATE.player;
        this.pipe = pipe;
    }

    update(frameTime:number):PlayerState_I {
        return this.state;
    }
    
    getPlayerState(): PlayerState_I {
        return this.state;
    }

    getPipeState(): PipeState_I {
        return this.pipe.getState();
    }

}