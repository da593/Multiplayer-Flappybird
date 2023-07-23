import { GameData, GameState, INITIAL_STATE, game_tick } from "@flappyblock/shared";
import { Player } from "entities/Player";

export class Game {
	players: Array<Player>
	state: Record<string, GameState>
	shouldEnd: boolean;

	constructor(players: Array<Player>) {
		this.state = {};
		this.players = players;

		players.forEach((player:Player) => {
			this.state[player.getEntityId()] = INITIAL_STATE;
		})
		this.shouldEnd = true;
	}

	getState(): Record<string, GameState> {
		this.players.forEach((player: Player) => {
			this.state[player.getEntityId()] = {player: player.getPlayerState(), pipe: player.getPipeState() }
		})
		return this.state;
	}

	setEndGame(shouldEnd: boolean): void {
		this.shouldEnd = shouldEnd;
	}


	updateGame(): void {
		const gameLoopId = setInterval(() => {
			if (this.shouldEnd) {
				clearInterval(gameLoopId);
			}
			this.players.forEach((player: Player) => {
				player.update();
			})
			
		}, game_tick)
	}





}