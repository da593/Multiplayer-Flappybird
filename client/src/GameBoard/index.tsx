import React from 'react';
import { BoardBackground } from './background';
import { Scoreboard } from 'GameBoard/Scoreboard';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { DimensionContext } from 'hooks/DimensionsContext';
import { useLoaderData } from 'react-router-dom';
import { Dimensions_I, GameState } from '@flappyblock/shared';

interface Props extends GameState {
    playerId_self: string;
    id: string;
    hasStarted: boolean;

}

export function BoardGame({id, playerId_self, player, pipe, hasStarted}: Props)  {
    const dimensions = useLoaderData() as Dimensions_I;
    const isSelf = playerId_self === id;
    return (
        <div className={pipe.hasCollided || !hasStarted ? "gameboard opaque" : "gameboard"}>
            <DimensionContext.Provider value={dimensions}>
                <Scoreboard isSelf={isSelf} score={player.score}/>
                <Pipe gapCoords={pipe.gapCoords}/>
                <Bird  isSelf={isSelf} birdCoords={player.birdCoords}/>
                <BoardBackground/> 
            </DimensionContext.Provider>
        </div>
    )
}

