import React from 'react';
import { BoardBackground } from './background';
import { Scoreboard } from 'GameBoard/Scoreboard';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { Dimensions_I, GameState_I } from 'GameState/types';
import { DimensionContext } from 'hooks/DimensionsContext';
import { useLoaderData } from 'react-router-dom';


export function BoardGame(props:GameState_I)  {
    const dimensions = useLoaderData() as Dimensions_I;    
    return (
        <div className={props.hasCollided ? "gameboard opaque" : "gameboard"}>
            <DimensionContext.Provider value={dimensions}>
                <Scoreboard score={props.score}/>
                <Pipe gapCoords={props.gapCoords}/>
                <Bird  birdCoords={props.birdCoords}/>
                <BoardBackground/> 
            </DimensionContext.Provider>
        </div>
    )
}

