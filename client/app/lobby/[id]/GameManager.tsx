import  {useState,useEffect, useRef, useContext} from "react";
import Link from 'next/link';
import { Events, GameState, INITIAL_STATE, KEYBINDS, WinState, calculateNewBirdCoords, calculateNewGapCoords } from "@flappyblock/shared";
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
    const [states, setStates] = useState<Record<string,GameState>>(initStates(players)); 
    const [startGame, setStartGame] = useState<boolean>(false);
    const [endGame, setEndGame] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>(WinState.NO_WINNER);

    function initStates(players: Array<string>):Record<string, GameState> {
        const states: Record<string, GameState> = {};
        players.forEach((id: string): void => {
            states[id] = INITIAL_STATE;
        })  
        return states;
    }

    const handleReset = () => {
        setStates(initStates(players));
        setStartGame(false);
        setEndGame(false);
        setWinner(WinState.NO_WINNER);
    }

    const handleStartGame = () => {
        socket.emit(Events.StartGame, {lobbyId: lobbyId});
    }

    useEffect(() => {
        const handleKeyBoardEvent = (e:KeyboardEvent): void => {
            if (KEYBINDS.find((str: string) => str === e.key)) {
                socket.emit(Events.PlayerInput, {lobbyId: lobbyId, playerId: playerId_self});
            }
        }

        window.addEventListener("keydown", handleKeyBoardEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyBoardEvent);

        };
    },[lobbyId, playerId_self, socket])

    useEffect(() => {
        if (!startGame) {
            setStates(initStates(players));
        }
    },[players, startGame]);

    useEffect(() => {
        socket.on(Events.StartGame, () => {
            setStartGame(true);
        });

        socket.on(Events.UpdateGame, (data) => {
            setStates(data.state);
        });

        socket.on(Events.EndGame, (data) => {
            setEndGame(true);
            setWinner(data.winner);
        });

        return () => {
            socket.off(Events.StartGame);
            socket.off(Events.UpdateGame);
            socket.off(Events.EndGame);
        }
    }, [socket]);

    return (
        <>
        {Object.entries(states).map(([id, state]) =>
            <BoardGame
                key={id}
                id={id}
                playerId_self={playerId_self}
                player={state.player}
                pipe={state.pipe}
                hasStarted={startGame}
            />
        )}
        {endGame ? 
            <NavigationMenu>
                {players.length > 1 ? winner : null}
                {Object.entries(states).map(([id, state]) => {
                    return (
                        <h1 key={id}>{id === playerId_self ? "Your" : "Opponent"} Score: {state.player.score}</h1>
                    )
                })}
                <li><button onClick={handleReset}>Play Again</button></li>
                <li><Link href="/">Main Menu</Link></li>
            </NavigationMenu> : 
        !startGame ? 
            <NavigationMenu>
                <li> <button onClick={handleStartGame}>Start Game</button> </li>
            </NavigationMenu> : null
        }
        </>
    )
}

