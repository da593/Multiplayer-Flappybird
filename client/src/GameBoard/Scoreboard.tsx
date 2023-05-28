
import { ScoreProps } from 'GameState/types';
import React from 'react';

type ScoreboardProps = ScoreProps
export function Scoreboard(props:ScoreboardProps) {

    return (
        <p className="score">{props.score}</p>
    )
}