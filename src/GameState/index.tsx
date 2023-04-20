import React, {useState,useEffect} from "react";
import { BoardGame } from "../GameBoard/index";
import {calculateBirdCoords, calculateNewBirdCoords, calculateNewGapCoords, detectCollision} from "./helper"
import { GameState_I, PlayerCount_I } from "./types";
import { GAME_DIMENSIONS, INITAL_STATE, KEYBINDS } from "./constants";
import { NavigationMenu } from 'NavigationMenu';
import { Link } from 'react-router-dom';

export function GameState(props:PlayerCount_I) {
    
    const [playersState, setPlayerState] = useState<GameState_I[]>(Array(props.players).fill(INITAL_STATE));
    const [numDeadPlayers, setNumDeadPlayers] = useState<number>(0);
    const requestRef = React.useRef(1);

    const updateGameState = (newPlayersState:GameState_I[]) => {
        if (numDeadPlayers !== props.players) {
            setPlayerState(newPlayersState);
        }
    }

    const animate = () => {
        const newPlayersState:GameState_I[] = playersState.map((player:GameState_I) => {
            if (player.hasCollided) {
                return player;
            }
            else if (detectCollision(player.birdCoords, player.gapCoords)) {
                setNumDeadPlayers(prevNum => prevNum + 1);
                return {
                    ...player, 
                    hasCollided: true}; 
                
            }   
            else if (player.birdCoords.topLeft.x === player.gapCoords.topRight.x + 1) {
                return {
                    ...player,
                    score: player.score + 1,
                    birdCoords: calculateNewBirdCoords(player.birdCoords),
                    gapCoords: calculateNewGapCoords(player.gapCoords)
                }
            }
            else {
                return {
                    ...player,
                    birdCoords: calculateNewBirdCoords(player.birdCoords),
                    gapCoords: calculateNewGapCoords(player.gapCoords)
                }
            }

        })
        updateGameState(newPlayersState);
    }
    
    const handleKeyBoardEvent = (e:KeyboardEvent) => {
        const newPlayersState:GameState_I[] = playersState.map((player:GameState_I,index: number) => { 
            if (e.key === KEYBINDS[index] && player.birdCoords.topLeft.y > 0 && !player.hasCollided) {
                const newBirdCoords = calculateBirdCoords(player.birdCoords.topLeft.y - GAME_DIMENSIONS.Y_FLY_UP);
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
        setPlayerState(Array(props.players).fill(INITAL_STATE));
        setNumDeadPlayers(0);
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyBoardEvent);
        return () => {
            window.removeEventListener("keydown", handleKeyBoardEvent);
        };
    },[playersState])

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [playersState])


    return (
        <>
        {playersState.map((state,index) => <BoardGame key={index} {...state} />)}
        {numDeadPlayers === props.players ? <NavigationMenu>
                {playersState.map((player:GameState_I, index:number) => {
                    return (
                        <h1 key={index}>P{index + 1} Score: {player.score}</h1>
                    )
                })}
                <li><button onClick={handleReset}>Play Again</button></li>
                <li><Link to="/">Main Menu</Link></li>
            </NavigationMenu> : null}
        </>
    )
}

