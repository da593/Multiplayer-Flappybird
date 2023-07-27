import React, {useState,useEffect, useRef, useContext} from "react";
import { BoardGame } from "../GameBoard/index";
import { NavigationMenu } from 'NavigationMenu';
import { Link } from 'react-router-dom';
import { Events, GameState, INITIAL_STATE, KEYBINDS } from "@flappyblock/shared";
import { SocketContext } from "hooks/socketContext";

interface Props {
    lobbyId: string
    playerId_self: string;
    players: Array<string>;
}

export function GameManager({lobbyId, playerId_self, players}:Props) {
    const socket = useContext(SocketContext);
    const [numPlayers, setNumPlayers] = useState<number>(players.length);
    const [numDeadPlayers, setNumDeadPlayers] = useState<number>(0);
    const [states, setStates] = useState<Record<string,GameState>>(initStates(players));
    const [startGame, setStartGame] = useState<boolean>(false);
    const requestRef = useRef(1);

    const returnWinner = () => {
        if (numDeadPlayers > 1) {
            if (states[0].player.score === states[1].player.score) {
                return <h1>Draw!</h1>
            }
            else if (states[0].player.score > states[1].player.score) {
                return <h1>Player 1 Wins!</h1>
            }
            else {
                return <h1>Player 2 Wins!</h1>
            }
        }
        else {
            return null;
        }
    }

    function initStates(players: Array<string>):Record<string, GameState> {
        const states: Record<string, GameState> = {}
        players.forEach((id: string): void => {
            states[id] = INITIAL_STATE;
        })  
        return states;
    }

    // const animate = () => {
    //     const newPlayersState:GameState[] = states.map((player:GameState) => {
    //         if (player.pipe.hasCollided) {
    //             return player;
    //         }
    //         else if (detectCollision(player.player.birdCoords, player.pipe.gapCoords)) {
    //             setNumDeadPlayers(prevNum => prevNum + 1);
    //             return {
    //                 ...player, 
    //                 hasCollided: true}; 
                
    //         }   
    //         else if (player.player.birdCoords.topLeft.x === player.pipe.gapCoords.topRight.x + 1) {
    //             return {
    //                 ...player,
    //                 score: player.player.score + 1,
    //                 birdCoords: calculateNewBirdCoords(player.player.birdCoords),
    //                 gapCoords: calculateNewGapCoords(player.pipe.gapCoords)
    //             }
    //         }
    //         else {
    //             return {
    //                 ...player,
    //                 birdCoords: calculateNewBirdCoords(player.player.birdCoords),
    //                 gapCoords: calculateNewGapCoords(player.pipe.gapCoords)
    //             }
    //         }

    //     })
    //     updateGameState(newPlayersState);
    // }

    // useEffect(() => {
    //     requestRef.current = requestAnimationFrame(animate);
    //     return () => cancelAnimationFrame(requestRef.current);
    // }, [])
    

    const handleReset = () => {
        setStates(initStates(players));
        setNumDeadPlayers(0);
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
    },[socket])

    useEffect(() => {
        if (!startGame) {
            setStates(initStates(players));
        }
    },[players]);

    useEffect(() => {
        socket.on(Events.StartGame, () => {
            setStartGame(true);
        });

        socket.on(Events.UpdateGame, (data) => {
            setStates(data.state);
        })
        return () => {
            socket.off(Events.StartGame);
            socket.off(Events.UpdateGame);
        }
    }, [socket]);

    useEffect(() => {
        //console.log(states);
    }, [states])


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
        {numDeadPlayers === numPlayers ? 
            <NavigationMenu>
                {returnWinner()}
                {Object.entries(states).map(([id, state]) => {
                    return (
                        <h1 key={id}>{id === playerId_self ? "Your" : "Opponent"} Score: {state.player.score}</h1>
                    )
                })}
                <li><button onClick={handleReset}>Play Again</button></li>
                <li><Link to="/">Main Menu</Link></li>
            </NavigationMenu> : 
        !startGame ? 
            <NavigationMenu>
                <li> <button onClick={handleStartGame}>Start Game</button> </li>
            </NavigationMenu> : null
        }
        </>
    )
}

