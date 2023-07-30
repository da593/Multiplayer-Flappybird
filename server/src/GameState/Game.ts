import { GameData, GameState, INITIAL_STATE, game_tick } from "@flappyblock/shared";
import { Player } from "#@/entities/Player.js";

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

	public removePlayer(playerId: string): void {
        const index = this.players.findIndex((elem:Player) => elem.getEntityId() === playerId);
        this.players.splice(index,1);
	}

	public getNumPlayers(): number {
		return this.players.length;
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
			if (this.shouldEnd || this.getNumPlayers() <= 0) {
				clearInterval(gameLoopId);
				console.log("clear game")
			}
			this.players.forEach((player: Player) => {
				player.update();
			})
			
		}, game_tick)
	}


	playerInput(playerId: string): void {
		const player = this.players.find((player: Player) => player.getEntityId() === playerId);
		player?.userInput();
	}


}