import * as React from "react";
import ClientAdapter from 'adapters/ClientAdapter'
import { Link } from "react-router-dom";
import { BoardBackground } from "components/BoardBackground";
import {GAME_WIDTH,GAME_HEIGHT} from "components/GameConstants";


export function MainPage() {

    return (
        <div className="body-container">
            <div className="canvas-container">
                <div className="navigation-menu">
                    <Link to="/gamepage">Singleplayer</Link>
                    <button>
                        Matchmake
                    </button>
                    <button onClick={() => ClientAdapter.createRoom("battle")}>
                        Create A Room
                    </button>
                    <button>
                        Join A Room
                    </button>
                </div>
                <BoardBackground width={GAME_WIDTH} height={GAME_HEIGHT}/>
            </div>
        </div>
    )
}

