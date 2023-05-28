import { GAME_DIMENSIONS, INITAL_STATE } from "GameState/constants";
import { GameState_I } from "GameState/types";

export class Player {
    #username:string;
    #id:string;
    #gameState: GameState_I;
    constructor(id:string, username:string = "default") {
        this.#username = username;
        this.#id = id;
        this.#gameState = INITAL_STATE;
    }
    setId(id:string):void {
        this.#id = id;
    }

    setUserName(username:string):void {
        this.#username = username;
    }

    setGameState(gameState:GameState_I):void {
        this.#gameState = gameState;
    }

    getId():string {
        return this.#id
    }

    getUsername():string {
        return this.#username
    }

    getGameState():GameState_I {
        return this.#gameState
    }
    
}