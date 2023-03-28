import * as React from "react";

import { Link } from "react-router-dom";
import { BoardBackground } from "GameBoard/background";
import {GAME_WIDTH,GAME_HEIGHT} from "GameState/constants";
import { NavigationMenu } from "NavigationMenu";

export function MainPage() {
    const navItems = ["1-player","2-players"];
        

    return (
        <div className="body-container">
            <div className="canvas-container">
                <div className="navigation-menu">
                    <ul>
                        <NavigationMenu items={navItems}/>
                    </ul>
                </div>
                <BoardBackground width={GAME_WIDTH} height={GAME_HEIGHT}/>
            </div>
        </div>
    )
}

