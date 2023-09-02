'use client'
import './nav.css';
import  { useContext } from 'react';
import { Events } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';
import Link from 'next/link';



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
                        <Link href="/" onClick={() => leaveLobby()}>FlappyBlock</Link>
                    </li>
                </div>
            </ul>
            
        </nav>
    )
}