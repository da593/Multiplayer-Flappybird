"use client"

import { useContext, useEffect, useState } from 'react';
import { notFound  } from 'next/navigation';
import { Events, LobbyResponse, ClientLobbyResponse } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';
import { GameManager } from './GameManager';
import { selectLobby } from './lobbySlice'
import { useSelector } from 'react-redux';
import { DivContainer } from '@/components/DivContainer';

export default function Page({ params }: { params: { id: string } }) {
  const socket = useContext(SocketContext);
  const lobbyData: ClientLobbyResponse = useSelector(selectLobby);
  const [lobbyState, setLobbyState] = useState<LobbyResponse>({...lobbyData});
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const self_id = lobbyData.playerId;

  if (lobbyState.players.length <= 0) {
    throw (notFound());
  };

  const copyLobbyId = () => {
    navigator.clipboard.writeText(params.id);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 5000)
  }

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
      {lobbyData.type === "multiplayer" ? 
      <div className='canvas-container'>
        <button 
          className="interactive"
          onClick={() => copyLobbyId()}>
            {hasCopied ? "Copied!" : "Copy Lobby Id"}
        </button>
        <p>{params.id}</p>
      </div> : null}
      <DivContainer className="canvas-container">
        <GameManager
          lobbyId={params.id}
          playerId_self={self_id}
          players = {lobbyState.players} 
        />
      </DivContainer>
    </>
  )
}