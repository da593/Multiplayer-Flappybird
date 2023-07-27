import { Events } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';
import React, { useContext } from 'react';
import { Link,Outlet } from 'react-router-dom';

export function Navbar() {
    const socket = useContext(SocketContext);

    const leaveLobby = () => {
        socket.emit(Events.LeaveLobby, {socketId: socket.id});
        console.log(socket.id);
    }

    return (
        <>
            <nav>
                <ul className="nav-list">
                    <div className="flex-left">
                        <li>
                            <Link to="/" onClick={() => leaveLobby()}>FlappyBlock</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={() => leaveLobby()}>Main Menu</Link>
                        </li>
                    </div>
                </ul>
                
            </nav>
            <Outlet/>
        </>
    )
}