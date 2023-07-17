import React, { useEffect, useState } from 'react';
import { GameManager } from 'GameManager';
import { BodyContainer } from './BodyContainer';
import { useLocation } from 'react-router-dom';
import { ClientSocket, Events, JoinLobbyResponse } from '@flappyblock/shared';


export function LobbyPage({socket}: {socket: ClientSocket}) {
    const location = useLocation();
    const [players, setPlayers] = useState<Array<string>>(location.state.players);

    useEffect(() => {
        socket.on(Events.JoinLobby, (data: JoinLobbyResponse) => {
            setPlayers(data.players);
        })
    },[])

    return (
        <>
        <p style={{color: "white"}}>Socket Id: {socket.id}</p>
        <p style={{color: "white"}}>Lobby Id: {location.state.lobbyId}</p>
        <p style={{color: "white"}}>Player Id: {location.state.playerId}</p>
        <BodyContainer>
                <GameManager
                    lobbyId={location.state.lobbyId}
                    playerId_self={location.state.playerId}
                    players = {players}
                    socket={socket} 
                />
        </BodyContainer>
        </>
    )
}