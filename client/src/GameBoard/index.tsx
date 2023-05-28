import React from 'react';
import { BoardBackground } from './background';
import { Scoreboard } from 'GameBoard/Scoreboard';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { GameState_I } from 'GameState/types';


export function BoardGame(props:GameState_I)  {
    
    return (
        <div className={props.hasCollided ? "gameboard opaque" : "gameboard"}>
            <Scoreboard score={props.score}/>
            <Pipe gapCoords={props.gapCoords}/>
            <Bird  birdCoords={props.birdCoords}/>
            <BoardBackground/> 
        </div>
    )
}

