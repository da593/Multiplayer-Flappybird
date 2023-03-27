import { GameSizeProps, ScoreProps } from 'GameState/types';
import React from 'react';

type ScoreboardProps = ScoreProps
export function Scoreboard(props:ScoreboardProps) {
    return (
        <div className="score">{props.score}</div>
    )
}