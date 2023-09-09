import  {useState,useEffect, useContext} from "react";
import Link from 'next/link';
import { BoxCoordinates, Coordinates, Events, GAME_DIMENSIONS, GameStateResponse, INITIAL_STATE, KEYBINDS, PipeState_I, PlayerState_I, ReadyCheck, WinState, calculateNewGapCoords } from "@flappyblock/shared";
import { SocketContext } from "hooks/socketContext";
import { BoardGame } from "components/BoardGame";
import { NavigationMenu } from "components/NavigationMenu";

interface Props {
    lobbyId: string
    playerId_self: string;
    players: Array<string>;
}

export function GameManager({lobbyId, playerId_self, players}:Props) {
    const socket = useContext(SocketContext);
    const [pipeState, setPipeState] = useState<PipeState_I>(INITIAL_STATE.pipe);
    const [playerStates, setPlayerStates] = useState<Record<string, PlayerState_I>>(initPlayerStates(players));
    const [startGame, setStartGame] = useState<boolean>(false);
    const [endGame, setEndGame] = useState<boolean>(false);
    const [numStart, setNumStart] = useState<number>(0);
    const [numReset, setNumReset] = useState<number>(0);
    const [winner, setWinner] = useState<string>(WinState.NO_WINNER);

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
        const handleKeyBoardEvent = (e:KeyboardEvent): void => {
            if (KEYBINDS.find((str: string) => str === e.key) && startGame) {
                socket.emit(Events.PlayerInput, {lobbyId: lobbyId, playerId: playerId_self});
            }
        }

        const handleTouchEvent = (e: TouchEvent): void => {
            if (startGame) {
                socket.emit(Events.PlayerInput, {lobbyId: lobbyId, playerId: playerId_self});
            }
        }

        window.addEventListener("keydown", handleKeyBoardEvent);
        window.addEventListener("touchstart", handleTouchEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyBoardEvent);
            window.removeEventListener("touchstart", handleTouchEvent);

        };
    },[lobbyId, playerId_self, startGame, socket])

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
            }
        });

        socket.on(Events.UpdateGame, (data) => {
            setPlayerStates(data.state.players);
            setPipeState(data.state.pipe);
        });

        socket.on(Events.EndGame, (data) => {
            setEndGame(true);
            setWinner(data.winner);
        });


        return () => {
            socket.off(Events.StartGame);
            socket.off(Events.ResetGame);
            socket.off(Events.UpdateGame);
            socket.off(Events.EndGame);
        }
    }, [socket, players, numStart, numReset]);

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

