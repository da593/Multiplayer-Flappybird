import { GameState, INITAL_STATE } from "@flappyblock/shared";
import { Player } from "entities/Player";

export class Game {
 gameState: Array<GameState>
 players: Array<Player>

 constructor(players: Array<Player>) {
    this.players = players;
    this.gameState = Array(this.players.length).fill(INITAL_STATE);
 }

 getState():Array<GameState> {
    return this.gameState;
 }

 start(): void {
    console.log("start")
 }

}