import React from 'react'
import { Link } from "react-router-dom";
import { NavMenuItems } from './types';

export function NavigationMenu(props:NavMenuItems) {

    return (
        <div className="navigation-menu">
            <ul>
                <li><button onClick={props.handleReset}>Replay</button></li>
                <li><Link to="/">Main Menu</Link></li>
            </ul>
        </div>
    )
}