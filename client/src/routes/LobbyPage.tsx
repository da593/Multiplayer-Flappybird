import React from 'react';
import { GameManager } from 'GameManager';
import { BodyContainer } from './BodyContainer';
import { useLocation } from 'react-router-dom';
import { ClientSocket } from '@flappyblock/shared';


export function LobbyPage({socket}: {socket: ClientSocket}) {
    const location = useLocation();
    console.log(location);
    return (
        <BodyContainer>
                <GameManager
                    playerId={location.state.playerId}
                    maxPlayers={location.state.maxPlayers} 
                    socket={socket} 
                />
        </BodyContainer>
    )
}