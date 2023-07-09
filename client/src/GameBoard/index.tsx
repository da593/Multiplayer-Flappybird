import React from 'react';
import { BoardBackground } from './background';
import { Scoreboard } from 'GameBoard/Scoreboard';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { DimensionContext } from 'hooks/DimensionsContext';
import { useLoaderData } from 'react-router-dom';
import { Dimensions_I, GameState } from '@flappyblock/shared';

interface Props extends GameState {
    hasStarted: boolean;
}

export function BoardGame({player, pipe, hasStarted}: Props)  {
    const dimensions = useLoaderData() as Dimensions_I;
    return (
        <div className={pipe.hasCollided || !hasStarted ? "gameboard opaque" : "gameboard"}>
            <DimensionContext.Provider value={dimensions}>
                <Scoreboard score={player.score}/>
                <Pipe gapCoords={pipe.gapCoords}/>
                <Bird  birdCoords={player.birdCoords}/>
                <BoardBackground/> 
            </DimensionContext.Provider>
        </div>
    )
}

