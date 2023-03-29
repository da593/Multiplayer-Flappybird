import * as React from "react";

import { Link } from "react-router-dom";
import { BoardBackground } from "GameBoard/background";
import {GAME_WIDTH,GAME_HEIGHT} from "GameState/constants";
import { NavigationMenu } from "NavigationMenu";

export function MainPage() {

        
    return (
        <div className="body-container">
            <div className="canvas-container">
                <div className="navigation-menu">
                    <ul>
                        <li><Link to="/gamepage">1-player</Link></li>
                        <li><Link to="/gamepage">2-players</Link></li>
                    </ul>
                </div>
                <BoardBackground width={GAME_WIDTH} height={GAME_HEIGHT}/>
            </div>
        </div>
    )
}

