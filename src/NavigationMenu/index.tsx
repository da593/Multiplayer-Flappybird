import React from 'react'
import { Link } from "react-router-dom";
import { NavMenuItems } from './types';

export function NavigationMenu(props:NavMenuItems) {
    const handleClick = (e:any) => {
        if (e.str != "reset") {
            
        }
    }

    return (

        <ul className="canvas-item nav-list">
            {props.items.map((str,index) => {
                return (
                    <li  key={str}><button onClick>
                        {str}
                    </button></li>
                )
            })}
        </ul>

    )
}