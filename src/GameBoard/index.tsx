import React from 'react';
import { BoardBackground } from './background';
import { Bird } from '../Bird/Bird';
import { Pipe } from '../Pipe/Pipe';
import { GapCoordProps, BirdCoordProps, ScoreProps, CollisionProps } from 'GameState/types';
import { Scoreboard } from 'Scoreboard';
import { NavigationMenu } from 'NavigationMenu';
import { Link } from 'react-router-dom';



type GameStateProps = GapCoordProps & BirdCoordProps & ScoreProps & CollisionProps;
export function BoardGame(props:GameStateProps)  {
    
    return (
        <>
            <Pipe gapCoords={props.gapCoords}/>
            <Bird  birdCoords={props.birdCoords}/>
            <Scoreboard score={props.score}/>
            <BoardBackground/> 
            {props.hasCollided ? <NavigationMenu>
                <li><button onClick={props.handleReset}>Replay</button></li>
                <li><Link to="/">Main Menu</Link></li>
            </NavigationMenu> : null}
        </>
    )
}

