'use client';

import  { useContext, useEffect, useState } from 'react';
import { SocketContext } from 'hooks/socketContext';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip from '@mui/material/Tooltip';

export function ConnectionState() {
    const socket = useContext(SocketContext);
    const [isConnected, setIsConnected] = useState(socket.connected);

    const connected = "Connected!"
    const disconnected = "Try refreshing the page. Not connected to a socket!"
    const toolTipTitle = isConnected ? connected : disconnected

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
      }, [socket, isConnected]);

      useEffect(() => {
        setIsConnected(socket.connected);
      },[socket.connected])


    return (
        <Tooltip disableFocusListener disableTouchListener placement='right' title={toolTipTitle}>
            <CircleIcon sx={{ color: isConnected ? "green" : "red" }}/>
        </Tooltip>
    )
}