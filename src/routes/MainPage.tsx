import React from 'react';
import { Link } from "react-router-dom";
import { BoardBackground } from "GameBoard/background";
import { NavigationMenu } from "NavigationMenu";
import { BodyContainer } from "./BodyContainer";
import { Pipe } from "Pipe/Pipe";
import { useGapCoords } from "hooks/useGapCoords";
import { Bird } from "Bird/Bird";
import { INITAL_STATE } from 'GameState/constants';

export function MainPage() {

    const gapCoords = useGapCoords({hasCollided:INITAL_STATE.hasCollided});
    return (
        <BodyContainer>
            <Pipe gapCoords={gapCoords}/>
            <Bird birdCoords={INITAL_STATE.birdCoords}/>
            <BoardBackground/>
            <NavigationMenu>
                <li><Link to="/gamepage">1-player</Link></li>
                <li><Link to="/gamepage">2-players</Link></li>
            </NavigationMenu>
        </BodyContainer>
    )
}

