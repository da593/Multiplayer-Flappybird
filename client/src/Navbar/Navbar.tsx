import React from 'react';
import { Link,Outlet } from 'react-router-dom';

export function Navbar() {
    return (
        <>
            <nav>
                <ul className="nav-list">
                    <div className="flex-left">
                        <li>
                            <Link to="/">FlappyBlock</Link>
                        </li>
                        <li>
                            <Link to="/">Main page</Link>
                        </li>
                    </div>
                </ul>
                
            </nav>
            <Outlet/>
        </>
    )
}