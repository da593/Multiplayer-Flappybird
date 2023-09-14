'use client'
import './nav.css';
import  { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Events } from '@flappyblock/shared';
import Tooltip from '@mui/material/Tooltip';
import { SocketContext } from 'hooks/socketContext';
import CircleIcon from '@mui/icons-material/Circle';

export function Navbar() {
    const socket = useContext(SocketContext);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const toolTipTitle = isConnected ? "Connected!" : "Not connected to a socket!";

    const leaveLobby = () => {
        socket.emit(Events.LeaveLobby, {socketId: socket.id});
    }
//style={{color: isConnected ? "green" : "red", marginTop: "25%"}}
    useEffect(() => {
        setIsConnected(socket.connected);
    }, [socket])


    return (
        <nav>
            <ul className="nav-list">
                <div className="flex-left">
                    <li>
                <Link href="/" onClick={() => leaveLobby()} style={{textDecoration:"underline"}}>FlappyBlock</Link>
                    </li>
                    <li>
                        <Tooltip disableFocusListener disableTouchListener placement='right' title={toolTipTitle}>
                            <CircleIcon sx={{ color: isConnected ? "green" : "red" }}/>
                        </Tooltip>
                    </li>
                </div>
            </ul>
        </nav>
    )
}