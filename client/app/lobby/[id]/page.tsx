"use client"

import { useContext, useEffect, useState } from 'react';
import { Events, LobbyResponse } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';
import { GameManager } from './GameManager';
import { selectLobby } from './lobbySlice'
import { useSelector } from 'react-redux';
import { CanvasContainer } from 'components/CanvasContainer';

export default function Page({ params }: { params: { id: string } }) {
  const socket = useContext(SocketContext);
  const lobbyData: LobbyResponse = useSelector(selectLobby);
  const [lobbyState, setLobbyState] = useState<LobbyResponse>(lobbyData);
  const self_id = lobbyData.playerId;
  
  useEffect(() => {
    socket.on(Events.LobbyDataToAllClients, (data: LobbyResponse) => {
      setLobbyState(data);
    })

    socket.on(Events.GetLatency, (cb: () => void) => {
        cb();
    });

    return () => {
        socket.off(Events.LobbyDataToAllClients);
        socket.off(Events.GetLatency);
    }
  },[socket])

  return (
    <>
      <p>Lobby Id: {params.id}</p>
      <CanvasContainer>
        <GameManager
          lobbyId={params.id}
          playerId_self={self_id}
          players = {lobbyState.players} 
        />
      </CanvasContainer>
    </>
  )
}