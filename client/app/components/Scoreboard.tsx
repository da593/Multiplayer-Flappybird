
import React from 'react';

interface Props {
    isSelf: boolean;
    score: number;
}

export function Scoreboard({isSelf, score}:Props) {

    return (
        <p className="score">{isSelf ? "You" : "Opponent"} : {score}</p>
    )
}