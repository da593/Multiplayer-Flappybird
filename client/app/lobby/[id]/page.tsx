"use client"

import { useContext, useEffect, useState } from 'react';
import { Events, LobbyResponse } from '@flappyblock/shared';
import { BodyContainer } from 'components/BodyContainer';
import { SocketContext } from 'hooks/socketContext';
import { useRouter } from 'next/navigation'
import { GameManager } from './GameManager';
import { selectLobby } from './lobbySlice'
import { useSelector } from 'react-redux';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const lobbyData: LobbyResponse = useSelector(selectLobby);
  const [lobbyState, setLobbyState] = useState<LobbyResponse>(lobbyData);
  useEffect(() => {

    socket.on(Events.JoinLobby, (data: LobbyResponse) => {
        setLobbyState(data);
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
    <BodyContainer>
      <GameManager
        lobbyId={params.id}
        playerId_self={lobbyState.playerId}
        players = {lobbyState.players} 
      />
    </BodyContainer>
  )
}