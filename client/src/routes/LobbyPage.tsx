import React, { useContext, useEffect, useState } from 'react';
import { GameManager } from 'GameManager';
import { BodyContainer } from './BodyContainer';
import { useLocation } from 'react-router-dom';
import { Events, JoinLobbyResponse } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';


export function LobbyPage() {
    const socket = useContext(SocketContext);
    const location = useLocation();
    const [players, setPlayers] = useState<Array<string>>(location.state.players);
    
    useEffect(() => {

        const onJoinLobby = (players: Array<string>) => {
            setPlayers(players);
        }

        socket.on(Events.JoinLobby, (data: JoinLobbyResponse) => {
            onJoinLobby(data.players)
        })

        socket.on(Events.GetLatency, (cb: () => void) => {
            cb();
        });

        return () => {
            socket.off(Events.JoinLobby);
            socket.off(Events.GetLatency);
        }
    },[socket])

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
                />
        </BodyContainer>
        </>
    )
}