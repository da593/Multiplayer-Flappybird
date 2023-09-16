'use client';

import './nav.css';
import { useContext } from 'react';
import Link from 'next/link';
import { ConnectionState } from './ConnectionState';
import { SocketContext } from 'hooks/socketContext';
import { Events } from '@flappyblock/shared';


export function Navbar() {
    const socket = useContext(SocketContext);

    const leaveLobby = () => {
        socket.emit(Events.LeaveLobby, {socketId: socket.id});
    }

    return (
        <nav>
            <ul className="nav-list">
                <div className="flex-left">
                    <li>
                <Link href="/" onClick={() => leaveLobby()} style={{textDecoration:"underline"}}>FlappyBlock</Link>
                    </li>
                    <li>
                        <ConnectionState/>
                    </li>
                </div>
            </ul>
        </nav>
    )
}