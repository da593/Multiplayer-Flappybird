
import React from 'react';

interface Props {
    score: number;
}

export function Scoreboard({score}:Props) {

    return (
        <p className="score">{score}</p>
    )
}