import React, {useState,useEffect} from "react";
import { BoardGame } from "../GameBoard/index";
import { NavigationMenu } from 'NavigationMenu';
import { Link } from 'react-router-dom';
import { ClientSocket, Events, GAME_DIMENSIONS, GameState, INITAL_STATE, KEYBINDS, LobbyData, calculateBirdCoords, calculateNewBirdCoords, calculateNewGapCoords, detectCollision } from "@flappyblock/shared";

interface Props {
    playerId: string;
    maxPlayers: number;
    socket: ClientSocket;
}

export function GameManager({playerId,maxPlayers, socket}:Props) {
    
    const [playersState, setPlayerState] = useState<GameState[]>(Array(maxPlayers).fill(INITAL_STATE));
    const [numDeadPlayers, setNumDeadPlayers] = useState<number>(0);
    const [startGame, setStartGame] = useState<boolean>(false);

    const requestRef = React.useRef(1);

    const updateGameState = (newPlayersState:GameState[]) => {
        if (numDeadPlayers !== maxPlayers) {
            setPlayerState(newPlayersState);
        }
    }

    const returnWinner = () => {
        if (numDeadPlayers > 1) {
            if (playersState[0].player.score === playersState[1].player.score) {
                return <h1>Draw!</h1>
            }
            else if (playersState[0].player.score > playersState[1].player.score) {
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
        const newPlayersState:GameState[] = playersState.map((player:GameState) => {
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
        const newPlayersState:GameState[] = playersState.map((player:GameState,index: number) => { 
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
        setPlayerState(Array(maxPlayers).fill(INITAL_STATE));
        setNumDeadPlayers(0);
    }

    const handleStartGame = async () => {
        setStartGame(true);
        
        const response = await socket.emitWithAck(Events.StartGame);
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyBoardEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyBoardEvent);
        };
    },[playersState])

    // useEffect(() => {
    //     requestRef.current = requestAnimationFrame(animate);
    //     return () => cancelAnimationFrame(requestRef.current);
    // }, [playersState])


    return (
        <>
        {playersState.map((state,index) => 
            <BoardGame 
                key={index}
                player={state.player}
                pipe={state.pipe}
                hasStarted={startGame}
            />
        )}
        {numDeadPlayers === maxPlayers ? 
            <NavigationMenu>
                {returnWinner()}
                {playersState.map((player:GameState, index:number) => {
                    return (
                        <h1 key={index}>{index + 1} Score: {player.player.score}</h1>
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

