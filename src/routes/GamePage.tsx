import React from 'react';
import { GameState } from 'GameState';
import { BodyContainer } from './BodyContainer';
import { useLocation } from 'react-router-dom';

export function GamePage() {
    const { state } = useLocation();
    return (
        <BodyContainer>
            <GameState players={state.players}/>
        </BodyContainer>
    )
}