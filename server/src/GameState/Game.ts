import { GameData, GameState, INITIAL_STATE, ReadyCheck, WinState, game_tick } from "@flappyblock/shared";
import { Player } from "#@/entities/Player.js";

export class Game {
	players: Array<Player>
	deadPlayers: Set<string>;
	lobbyCheck: Set<string>;
	hasStarted: boolean;
	shouldEnd: boolean;
	winner: string;


	constructor() {
		this.players = new Array()
		this.deadPlayers = new Set();
		this.lobbyCheck = new Set();
		this.hasStarted = false;
		this.shouldEnd = false;
		this.winner = "none";
	}

 	getNumPlayers(): number {
		return this.players.length;
	}

	getWinner(): string {
		return this.winner;
	}

	getShouldEnd(): boolean {
		return this.shouldEnd;
	}

	getHasStarted(): boolean {
		return this.hasStarted;
	}

	getState(): Record<string, GameState> {
		const currentState: Record<string, GameState> = {};
		this.players.forEach((player: Player) => {
			currentState[player.getEntityId()] = {player: player.getPlayerState(), pipe: player.getPipeState() }
		})
		return currentState;
	}

	addPlayer(newPlayer: Player): void {
		this.players.push(newPlayer);
	}

	removePlayer(playerId: string): void {
        const index = this.players.findIndex((elem:Player) => elem.getEntityId() === playerId);
        this.players.splice(index,1);
	}

	resetState(): void {
		this.players.forEach((player: Player) => {
			player.resetState()
		})
	}

	startGame(playerId: string): ReadyCheck {
		this.lobbyCheck.add(playerId);
		const readyCheck = {
			numReady: this.lobbyCheck.size,
		}
		if (readyCheck.numReady === this.players.length) {
			this.lobbyCheck = new Set();
			this.hasStarted = true;
			this.resetState();
			this.updateGame();
		}
		return readyCheck;

	}

	restartGame(playerId: string): ReadyCheck {
		this.lobbyCheck.add(playerId);
		const readyCheck = {
			numReady: this.lobbyCheck.size,
		}
		if (readyCheck.numReady ===  this.players.length) {
			this.deadPlayers = new Set();
			this.lobbyCheck = new Set();
			this.hasStarted = false;
			this.shouldEnd = false;
			this.winner = "none";
			this.resetState();
		}
		return readyCheck;
	}

	updateGame(): void {
		const gameLoopId = setInterval(() => {
			if (this.getNumPlayers() <= 0 || this.deadPlayers.size === this.players.length) {
				this.determineWinner();
				clearInterval(gameLoopId);
				this.shouldEnd = true;
			}
			this.players.forEach((player: Player) => {
				if (player.getHasCollided()) {
					this.deadPlayers.add(player.getEntityId());
				}
				else {
					player.update();
				}
			})
			
		}, game_tick);
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

	setShouldEnd(bool: boolean) {
		this.shouldEnd = bool;
	}

}