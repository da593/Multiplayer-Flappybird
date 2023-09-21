import  {useState,useEffect, useContext, useRef} from "react";
import Link from 'next/link';
import { AudioCue, BoxCoordinates, EndGameData, Events, GameData, GameStateResponse, INITIAL_STATE, KEYBINDS, PipeState_I, PlayerState_I, ReadyCheck, WinState, calculateNewBirdCoords, calculateNewGapCoords, game_tick } from "@flappyblock/shared";
import { SocketContext } from "hooks/socketContext";
import { BoardGame } from "components/BoardGame";
import { NavigationMenu } from "components/NavigationMenu";
import { useAudio } from "@/hooks/useAudio";

interface Props {
    lobbyId: string
    playerId_self: string;
    players: Array<string>;
}

export function GameManager({lobbyId, playerId_self, players}:Props) {
    const socket = useContext(SocketContext);
    const [pipeState, setPipeState] = useState<PipeState_I>(INITIAL_STATE.pipe);
    const [playerStates, setPlayerStates] = useState<Record<string, PlayerState_I>>(initPlayerStates(players));
    const [snapshot, setSnapshot] = useState<GameStateResponse | undefined>();
    const [snapshotsLength, setSnapshotsLength] = useState<number>(-1);
    const [startGame, setStartGame] = useState<boolean>(false);
    const [endGame, setEndGame] = useState<boolean>(false);
    const [numStart, setNumStart] = useState<number>(0);
    const [numReset, setNumReset] = useState<number>(0);
    const [winner, setWinner] = useState<string>(WinState.NO_WINNER);
    const audio = useAudio(AudioCue.JUMP);
    const snapshots = useRef<Array<GameStateResponse>>([]);

    function initPlayerStates(players: Array<string>): Record<string, PlayerState_I> {
        const states: Record<string, PlayerState_I> = {};
        players.forEach((id: string): void => {
            states[id] = INITIAL_STATE.player;
        })  
        return states;
    }

    const leaveLobby = () => {
        socket.emit(Events.LeaveLobby, {socketId: socket.id});
    }

    const handleReset = () => {
        socket.emit(Events.ResetGame, {lobbyId: lobbyId, playerId: playerId_self});
    }

    const handleStartGame = () => {
        socket.emit(Events.StartGame, {lobbyId: lobbyId, playerId: playerId_self});
    }

    const determineWinner = (): string => {
        if (winner === WinState.DRAW) {
            return "DRAW!"
        }
        else if (winner === playerId_self) {
            return "YOU WON!"
        }
        else {
            return "OPPONENT WON!"
        }
    }

    useEffect(() => {

        const emitUserInput = () => {
            socket.emit(Events.PlayerInput, {lobbyId: lobbyId, playerId: playerId_self});
            if (playerStates[playerId_self].birdCoords.topLeft.y > 0 && !playerStates[playerId_self].hasCollided) {
                audio?.play()
            }
        }

        const handleKeyBoardEvent = (e: KeyboardEvent): void => {
            if (KEYBINDS.find((str: string) => str === e.key) && startGame) {
                if (e.repeat) { return }
                emitUserInput();
            }
        }

        const handleMouseEvent = (): void => {
            if (startGame) {
                emitUserInput();
            }
        }

        window.addEventListener("keydown", handleKeyBoardEvent);
        window.addEventListener("click", handleMouseEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyBoardEvent);
            window.removeEventListener("click", handleMouseEvent);

        };
    },[lobbyId, playerId_self, startGame, socket, playerStates, audio])

    useEffect(() => {
        if (!startGame) {
            setPlayerStates(initPlayerStates(players));
            setPipeState(INITIAL_STATE.pipe);
            setNumReset(0);
            setNumStart(0);
        }
    },[players, startGame, players.length]);

    useEffect(() => {
        socket.on(Events.StartGame, ({numReady}: ReadyCheck) => {
            setNumStart(numReady);
            if (numReady === players.length) {
                setStartGame(true);
                setNumReset(0);
            }
        });

        socket.on(Events.ResetGame, ({numReady}: ReadyCheck) => {
            setNumReset(numReady);
            if (numReady === players.length) {
                setStartGame(false);
                setEndGame(false);
                setNumStart(0);

                snapshots.current = [];
                setSnapshot(undefined);
                setSnapshotsLength(-1);
            }
        });

        socket.on(Events.UpdateGame, (data: GameData) => {
            snapshots.current.push(data.state);
            if (snapshots.current.length >= 4) {
                const snapshot: GameStateResponse | undefined =snapshots.current.shift();
                if (snapshot) {
                    setSnapshot(snapshot);
                    setPipeState(snapshot.pipe);
                    setPlayerStates(snapshot.players);
                }
            }
        });

        socket.on(Events.EndGame, (data: EndGameData) => {
            const id = setInterval(() => {
                const snapshot: GameStateResponse | undefined =snapshots.current.shift();
                if (snapshot) {
                    setSnapshot(snapshot);
                    setPipeState(snapshot.pipe)
                    setPlayerStates(snapshot.players);
                    setSnapshotsLength(snapshots.current.length);
                }
                else {
                    setEndGame(true);
                    setSnapshotsLength(-1);
                    setWinner(data.winner);
                    clearInterval(id);
                }
            }, game_tick)
        });

        return () => {
            socket.off(Events.StartGame);
            socket.off(Events.ResetGame);
            socket.off(Events.UpdateGame);
            socket.off(Events.EndGame);
        }
    }, [socket, players, numStart, numReset, playerId_self]);


    useEffect(() => {
        if (snapshotsLength === 0 && startGame) {
            setEndGame(true);
            setSnapshotsLength(-1);
        }
    }, [snapshotsLength, startGame]);

    useEffect(() => {
        let gapId: number = 0;
        let birdId: number = 0;
        const INTERPOLATE_VELOCITY: number = 1;

        const interpolatePipe = (gapCoords: BoxCoordinates, maxGapCoords: BoxCoordinates, accumulator: number): void => {
            const start = performance.now();
            const newGapCoords: BoxCoordinates = calculateNewGapCoords(gapCoords, INTERPOLATE_VELOCITY)  
            const accumulated = performance.now() - start + accumulator;
            if (accumulated < game_tick  && newGapCoords.topLeft.x > maxGapCoords.topLeft.x) {
                setPipeState({
                    gapCoords: newGapCoords
                });
                gapId = window.requestAnimationFrame(() => interpolatePipe(newGapCoords, maxGapCoords, accumulated));
            }
        }

        const interpolateBird = (states: Record<string, PlayerState_I>, accumulator: number): void => {
            const newState = {
                ...playerStates
            }
            const start = performance.now();
            players.forEach((player: string) => {
                const snapshotPlayerCoords = states[player].birdCoords;
                const maxBirdCoords: BoxCoordinates = calculateNewBirdCoords(snapshotPlayerCoords);
                const newBirdCoords: BoxCoordinates = calculateNewBirdCoords(snapshotPlayerCoords, INTERPOLATE_VELOCITY);
                if (snapshotPlayerCoords.topLeft.y > 0 && newBirdCoords.topLeft.y < maxBirdCoords.topLeft.y && !states[player].hasCollided) {
                    newState[player].birdCoords = newBirdCoords;
                }
                else {
                    console.log(player, newState[playerId_self].birdCoords);
                }
            })
            const accumulated = performance.now() - start + accumulator;
            if (accumulated < game_tick) {
                setPlayerStates(newState);
                birdId = window.requestAnimationFrame(() => interpolateBird(newState, accumulated));
            }
        }

        if (!endGame && snapshot && startGame) {
            const snapshotGapCoords = snapshot.pipe.gapCoords;
            const maxGapCoords: BoxCoordinates = calculateNewGapCoords(snapshotGapCoords);
 

            if (snapshotGapCoords.topRight.x > 0) {
                window.cancelAnimationFrame(gapId);
                interpolatePipe(snapshotGapCoords, maxGapCoords, 0);
            }

            // window.cancelAnimationFrame(birdId);
            // interpolateBird(snapshot.players, 0);

        }
        else {
            window.cancelAnimationFrame(gapId);
            window.cancelAnimationFrame(birdId);
        }

        return () => {
            window.cancelAnimationFrame(gapId);
            window.cancelAnimationFrame(birdId);
        }

    }, [snapshot, endGame, startGame, playerId_self]);

    return (
        <>
        <BoardGame
            playerId_self={playerId_self}
            players={playerStates}
            pipe={pipeState}
            hasStarted={startGame}
        />
        {endGame ? 
            <NavigationMenu>
                {players.length > 1 ?  <p>{determineWinner()}</p>: null}
                {Object.entries(playerStates).map(([id, playerState]) => {
                    return (
                        <h1 key={id}>{id === playerId_self ? "Your" : "Opponent"} Score: {playerState.score}</h1>
                    )
                })}
                <li><button onClick={handleReset}>
                    Play Again 
                    {
                        players.length > 1 ? <p>{numReset + " / " + players.length}</p> : null
                    }
                </button></li>
                <li><Link href="/" onClick={() => leaveLobby()}>Main Menu</Link></li>
            </NavigationMenu> : 
        !startGame ? 
            <NavigationMenu>
                <li> <button onClick={handleStartGame}>
                    Start Game
                    {
                        players.length > 1 ? <p>{numStart + " / " + players.length}</p> : null
                    }
                </button> </li>
                <li><Link href="/" onClick={() => leaveLobby()}>Main Menu</Link></li>
            </NavigationMenu> : null
        }
        </>
    )
}

