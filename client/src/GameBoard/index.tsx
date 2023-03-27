import React from 'react';
import { BoardBackground } from './background';
import { Bird } from '../Bird/Bird';
import { Pipe } from '../Pipe/Pipe';
import { GameSizeProps, GapCoordProps, BirdCoordProps, ScoreProps } from 'GameState/types';
import { Scoreboard } from 'Scoreboard';

type GameStateProps = GameSizeProps & GapCoordProps & BirdCoordProps & ScoreProps;
export function BoardGame(props:GameStateProps)  {
    return (
        <div>
            <Pipe width={props.width} height={props.height} gapCoords={props.gapCoords}/>
            <Bird width={props.width} height={props.height} birdCoords={props.birdCoords}/>
            <Scoreboard score={props.score} />
            <BoardBackground width={props.width} height={props.height}/> 
        </div>
    )
}