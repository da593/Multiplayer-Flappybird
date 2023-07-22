import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { BoardBackground } from "GameBoard/background";
import { NavigationMenu } from "NavigationMenu";
import { BodyContainer } from "./BodyContainer";
import { Pipe } from "GameBoard/Pipe";
import { Bird } from "GameBoard/Bird";
import { DimensionContext } from 'hooks/DimensionsContext';
import { useGapCoords } from "hooks/useGapCoords";
import { Dimensions_I, Events, INITIAL_STATE } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';

export function MainPage() {
    const socket = useContext(SocketContext);
    const dimensions = useLoaderData() as Dimensions_I;
    const navigate = useNavigate();

    const gapCoords = useGapCoords(dimensions);
    const [isOpened,setIsOpened] = useState(false);
    const [lobbyText,setLobbyText] = useState("");


    const createLobby = async (maxPlayers: number) => {
        try {
            const response = await socket.emitWithAck(Events.CreateLobby, {maxPlayers: maxPlayers});
            const endpoint: string = "lobby/" + response.lobbyId;
            navigate(endpoint, {state: {...response}});
        } 
        catch (e) {
            console.log(e);
        }
    }

    const joinLobbyQueryRequest = async () => {

        const lobbyId = lobbyText;
        try {
            const response = await socket.emitWithAck(Events.JoinLobby, {lobbyId: lobbyId});
            const endpoint: string = "lobby/" + response.lobbyId;
            navigate(endpoint, {state: {...response}});
        } 
        catch (e) {
            console.log(e);
        }
    }

    const joinLobbyQuery = () => {
        setIsOpened(true);
    }


    return (
        <BodyContainer>
                <DimensionContext.Provider value={dimensions}>
                    <Pipe gapCoords={gapCoords}/>
                    <Bird isSelf={true} birdCoords={INITIAL_STATE.player.birdCoords}/>
                    <BoardBackground/>
                </DimensionContext.Provider>
            <NavigationMenu>
                <li> <button onClick={() => createLobby(1)}> Singleplayer </button> </li>
                <li> <button onClick={() => createLobby(2)}> Create Lobby </button> </li>
                <li> <button onClick={joinLobbyQuery}> Join Lobby </button> </li>
                <div style={isOpened ? {display: "block"} : {display: "none"}}>
                    <label>Enter Lobby Id</label>
                    <input onChange={(e) => setLobbyText(e.target.value)}/>
                    <button onClick={() => joinLobbyQueryRequest()}>Submit</button>
                </div>
            </NavigationMenu>
        </BodyContainer>
    )
}

