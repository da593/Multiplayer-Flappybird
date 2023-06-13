import React, { useEffect } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import { BoardBackground } from "GameBoard/background";
import { NavigationMenu } from "NavigationMenu";
import { BodyContainer } from "./BodyContainer";
import { Pipe } from "GameBoard/Pipe";
import { Bird } from "GameBoard/Bird";
import { INITAL_STATE } from 'GameState/constants';
import { Dimensions_I } from 'GameState/types';
import { DimensionContext } from 'hooks/DimensionsContext';
import { useGapCoords } from "hooks/useGapCoords";
import { socket } from 'ConnectionManager/Socket';


export function MainPage() {
    const dimensions = useLoaderData() as Dimensions_I;
    const gapCoords = useGapCoords(dimensions);

    const createLobby = () => {
        socket.connect();
        
    }
    return (
        <BodyContainer>
                <DimensionContext.Provider value={dimensions}>
                    <Pipe gapCoords={gapCoords}/>
                    <Bird birdCoords={INITAL_STATE.birdCoords}/>
                    <BoardBackground/>
                </DimensionContext.Provider>
            <NavigationMenu>
                <li><Link to="/game/:lobbyId" state={{players:1}}> Singleplayer </Link></li>
                <li><Link onClick={createLobby} to="/game/:lobbyId" state={{players:2}}> Create Lobby </Link></li>
                <li><Link to="/game/:lobbyId" state={{players:2}}> Join Lobby </Link></li>
            </NavigationMenu>
        </BodyContainer>
    )
}

