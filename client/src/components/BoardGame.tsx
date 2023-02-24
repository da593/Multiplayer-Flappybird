import React from 'react';
import { BoxCoordinates } from './GameState';
import { BoardBackground } from './BoardBackground';
import { Bird } from './Bird';
import { Pipe } from './Pipe';


export interface BoardSize {
    width: number,
    height: number,
}


export interface PipeCoordinates {
    xPipeLoc: number,
    yGapLoc: number,
    
}

export interface BirdCoordinates {
    yBirdLoc: number;
}

type GameProps = BoardSize & PipeCoordinates & BirdCoordinates

export function BoardGame(props:GameProps)  {
    return (
        <div>
            <Pipe width={props.width} height={props.height} xPipeLoc={props.xPipeLoc} yGapLoc={props.yGapLoc}/>
            <Bird width={props.width} height={props.height} yBirdLoc={props.yBirdLoc}/>
            <BoardBackground width={props.width} height={props.height}/> 
        </div>
    )
}