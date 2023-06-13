import React from 'react';
import { GameState } from 'GameState';
import { BodyContainer } from './BodyContainer';
import { useLoaderData, useLocation } from 'react-router-dom';
import { DimensionContext } from 'hooks/DimensionsContext';
import { Dimensions_I } from 'GameState/types';

export function LobbyPage() {
    const { state } = useLocation();

    
    return (
        <BodyContainer>
                <GameState players={state.players}/>
        </BodyContainer>
    )
}