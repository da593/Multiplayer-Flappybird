import { GameState } from "@flappyblock/shared";
import { Player } from "entities/Player";

export class Game {
 gameState: Array<GameState>
 players: Array<Player>

 constructor(players: Array<Player>) {
    this.players = players;
    this.gameState = new Array();
    this.players.map((player:Player) => {
      this.gameState.push({player: player.getPlayerState(), pipe: player.getPipeState()})
    });
 }

 getState():Array<GameState> {
    return this.gameState;
 }

 start(): void {
    console.log("start")
 }

}