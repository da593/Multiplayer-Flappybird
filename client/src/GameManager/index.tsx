import React, {useState,useEffect} from "react";
import { BoardGame } from "../GameBoard/index";
import { NavigationMenu } from 'NavigationMenu';
import { Link } from 'react-router-dom';
import { ClientSocket, Events, GAME_DIMENSIONS, GameState, INITIAL_STATE, KEYBINDS, calculateBirdCoords, calculateNewBirdCoords, calculateNewGapCoords, detectCollision } from "@flappyblock/shared";

interface Props {
    playerId_self: string;
    players: Array<string>;
    socket: ClientSocket;
}

export function GameManager({playerId_self, players, socket}:Props) {
    const numPlayers = players.length;
    const INIT_STATE: Array<GameState> = [];
    players.forEach((playerId: string) => {
        const stateObj = {
            pipe: {...INITIAL_STATE.pipe}, 
            player: {...INITIAL_STATE.player, playerId: playerId}
        }
        if (playerId === playerId_self) {
            INIT_STATE.unshift(stateObj);
        }
        else {
            INIT_STATE.push(stateObj);
        }
    })
    const [numDeadPlayers, setNumDeadPlayers] = useState<number>(0);
    const [states, setStates] = useState<Array<GameState>>(INIT_STATE);
    const [startGame, setStartGame] = useState<boolean>(false);
    const requestRef = React.useRef(1);

    const updateGameState = (newPlayersState:Array<GameState>) => {
        if (numDeadPlayers < numPlayers) {
            setStates(newPlayersState);
        }
    }
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

    const animate = () => {
        const newPlayersState:GameState[] = states.map((player:GameState) => {
            if (player.pipe.hasCollided) {
                return player;
            }
            else if (detectCollision(player.player.birdCoords, player.pipe.gapCoords)) {
                setNumDeadPlayers(prevNum => prevNum + 1);
                return {
                    ...player, 
                    hasCollided: true}; 
                
            }   
            else if (player.player.birdCoords.topLeft.x === player.pipe.gapCoords.topRight.x + 1) {
                return {
                    ...player,
                    score: player.player.score + 1,
                    birdCoords: calculateNewBirdCoords(player.player.birdCoords),
                    gapCoords: calculateNewGapCoords(player.pipe.gapCoords)
                }
            }
            else {
                return {
                    ...player,
                    birdCoords: calculateNewBirdCoords(player.player.birdCoords),
                    gapCoords: calculateNewGapCoords(player.pipe.gapCoords)
                }
            }

        })
        updateGameState(newPlayersState);
    }
    
    const handleKeyBoardEvent = (e:KeyboardEvent): void => {
        const newPlayersState:GameState[] = states.map((player:GameState,index: number) => { 
            if (e.key === KEYBINDS[index] && player.player.birdCoords.topLeft.y > 0 && !player.pipe.hasCollided) {
                const newBirdCoords = calculateBirdCoords(player.player.birdCoords.topLeft.y - GAME_DIMENSIONS.Y_FLY_UP);
                return {
                    ...player,
                    birdCoords: newBirdCoords
                };
                
            }
            else {
                return player;
            }
        })
        updateGameState(newPlayersState);
    }

    const handleReset = () => {
        setStates(Array(numPlayers).fill(INIT_STATE));
        setNumDeadPlayers(0);
    }

    const handleStartGame = async () => {
        setStartGame(true);

    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyBoardEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyBoardEvent);
        };
    },[states])

    // useEffect(() => {
    //     requestRef.current = requestAnimationFrame(animate);
    //     return () => cancelAnimationFrame(requestRef.current);
    // }, [playersState])


    return (
        <>
        {states.map((state, index) =>
            <BoardGame
                key={index}
                playerId_self={playerId_self}
                player={state.player}
                pipe={state.pipe}
                hasStarted={startGame}
            />
        )}
        {numDeadPlayers === numPlayers ? 
            <NavigationMenu>
                {returnWinner()}
                {states.map((state:GameState, index) => {
                    return (
                        <h1 key={index}>{state.player.playerId === playerId_self ? "Your" : "Opponent"} Score: {state.player.score}</h1>
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

