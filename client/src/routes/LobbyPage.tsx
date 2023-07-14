import React from 'react';
import { GameManager } from 'GameManager';
import { BodyContainer } from './BodyContainer';
import { useLocation } from 'react-router-dom';
import { ClientSocket } from '@flappyblock/shared';


export function LobbyPage({socket}: {socket: ClientSocket}) {
    const location = useLocation();
    return (
        <>
        <p style={{color: "white"}}>Socket Id: {socket.id}</p>
        <p style={{color: "white"}}>Lobby Id: {location.state.lobbyId}</p>
        <p style={{color: "white"}}>Player Id: {location.state.playerId}</p>
        <BodyContainer>
                <GameManager
                    playerId_self={location.state.playerId}
                    players = {location.state.players}
                    socket={socket} 
                />
        </BodyContainer>
        </>
    )
}