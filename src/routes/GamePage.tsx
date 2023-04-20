import React from 'react';
import { GameState } from 'GameState';
import { BodyContainer } from './BodyContainer';
import { PlayerCount_I } from 'GameState/types';
import { useLocation } from 'react-router-dom';

export function GamePage() {
    const { state } = useLocation();
    return (
        <BodyContainer>
            <GameState players={state.players}/>
        </BodyContainer>
    )
}