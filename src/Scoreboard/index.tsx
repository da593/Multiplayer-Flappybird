import { ScoreProps } from 'GameState/types';
import React from 'react';

type ScoreboardProps = ScoreProps
export function Scoreboard(props:ScoreboardProps) {
    return (
        <div className="canvas-item score">{props.score}</div>
    )
}