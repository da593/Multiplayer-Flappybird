import React from 'react';
import { GameState } from 'GameState';
import { BodyContainer } from './BodyContainer';

export function GamePage() {

    return (
        
        <BodyContainer>
            <GameState />
        </BodyContainer>
    )
}