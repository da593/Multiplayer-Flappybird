import React from 'react';
import { BoardBackground } from './background';
import { Bird } from '../Bird/Bird';
import { Pipe } from '../Pipe/Pipe';
import { GameSizeProps, GapCoordProps, BirdCoordProps, ScoreProps, CollisionProps } from 'GameState/types';
import { Scoreboard } from 'Scoreboard';
import { NavigationMenu } from 'NavigationMenu';

type GameStateProps = GameSizeProps & GapCoordProps & BirdCoordProps & ScoreProps & CollisionProps;
export function BoardGame(props:GameStateProps)  {
    const navItems = ["reset", "Main Menu"]

    return (
        <div className="canvas-container-default">
            <Pipe width={props.width} height={props.height} gapCoords={props.gapCoords}/>
            <Bird width={props.width} height={props.height} birdCoords={props.birdCoords}/>
            <Scoreboard score={props.score} />
            <BoardBackground width={props.width} height={props.height}/> 
            {props.hasCollided ? <NavigationMenu items={navItems}/> : null}
        </div>
    )
}