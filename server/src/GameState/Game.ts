import { GameData, GameState, INITIAL_STATE, WinState, game_tick } from "@flappyblock/shared";
import { Player } from "#@/entities/Player.js";

export class Game {
	players: Array<Player>;
	state: Record<string, GameState>;
	deadPlayers: Set<string>;
	winner: string;
	shouldEnd: boolean;

	constructor(players: Array<Player>) {
		this.state = {};

		this.players = players;
		players.forEach((player:Player) => {
			this.state[player.getEntityId()] = INITIAL_STATE;
		})
		
		this.deadPlayers = new Set();
		this.winner = "none";
		this.shouldEnd = false;
	}

 	getNumPlayers(): number {
		return this.players.length;
	}

	getState(): Record<string, GameState> {
		this.players.forEach((player: Player) => {
			this.state[player.getEntityId()] = {player: player.getPlayerState(), pipe: player.getPipeState() }
		})
		return this.state;
	}

	getWinner(): string {
		return this.winner;
	}

	getShouldEnd(): boolean {
		return this.shouldEnd;
	}

	removePlayer(playerId: string): void {
        const index = this.players.findIndex((elem:Player) => elem.getEntityId() === playerId);
        this.players.splice(index,1);
	}

	updateGame(): void {
		const gameLoopId = setInterval(() => {
			if (this.getNumPlayers() <= 0 || this.deadPlayers.size == this.players.length) {
				this.determineWinner();
				this.shouldEnd = true;
				clearInterval(gameLoopId);
				console.log("clear game");
			}
			this.players.forEach((player: Player) => {
				if (player.getHasCollided()) {
					this.deadPlayers.add(player.getEntityId());
				}
				else {
					player.update();
				}
			})
			
		}, game_tick)
	}

	playerInput(playerId: string): void {
		const player = this.players.find((player: Player) => player.getEntityId() === playerId);
		player?.userInput();
	}

	determineWinner(): void {
		if (this.players.length > 1) {
			let maxScore = this.players[0].score;
			this.winner = this.players[0].getEntityId();
			for (let i = 1; i < this.players.length; i++) {
				if (this.players[i].score > maxScore) {
					maxScore =  this.players[0].score;
					this.winner = this.players[i].getEntityId();
				}
				else if (this.players[i].score === maxScore) {
					this.winner = WinState.DRAW
				}
			}
		}
		else {
			this.winner = WinState.NO_WINNER
		}
	}

}