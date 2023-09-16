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
    const [toolTipTitle, setToolTipTitle] = useState(socket.connected ? connected : disconnected)

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
          setToolTipTitle(connected);
        }
    
        function onDisconnect() {
          setIsConnected(false);
          setToolTipTitle(disconnected);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
      }, [socket, isConnected]);


    return (
        <Tooltip disableFocusListener disableTouchListener placement='right' title={toolTipTitle}>
            <CircleIcon sx={{ color: isConnected ? "green" : "red" }}/>
        </Tooltip>
    )
}