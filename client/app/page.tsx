'use client';

import  { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DimensionContext } from 'hooks/DimensionsContext';
import { useGapCoords } from "hooks/useGapCoords";
import { Events, GAME_DIMENSIONS, INITIAL_STATE } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';
import { Pipe } from 'components/Pipe';
import { Bird } from './components/Bird';
import { BoardBackground } from 'components/background';
import { NavigationMenu } from 'components/NavigationMenu';
import { useRouter } from 'next/navigation';
import { selectLobby, updateLobby } from '@/lobby/[id]/lobbySlice';
import { CanvasContainer } from 'components/CanvasContainer';

export default function HomePage() {
    const socket = useContext(SocketContext);
    const dimensions = GAME_DIMENSIONS;
    const lobbyData = useSelector(selectLobby);
    const gapCoords = useGapCoords(dimensions);
    const [isOpened,setIsOpened] = useState(false);
    const [lobbyText,setLobbyText] = useState("");
    const router = useRouter()
    const dispatch = useDispatch()

    const navigate = (lobbyId: string) => {
        const endpoint: string = "lobby/" + lobbyId;
        router.push(endpoint);
    }

    const createLobby = async (maxPlayers: number) => {
        try {
            const response = await socket.emitWithAck(Events.CreateLobby, {maxPlayers: maxPlayers, socketId: socket.id});
            dispatch(updateLobby(response));
            navigate(response.lobbyId);
        } 
        catch (e) {
            console.log(e);
        }
    }

    const joinLobbyQueryRequest = async () => {
        try {
            const lobbyId = lobbyText;
            const response = await socket.emitWithAck(Events.JoinLobby, {lobbyId: lobbyId, socketId: socket.id});
            dispatch(updateLobby(response));
            navigate(response.lobbyId);
        } 
        catch (e) {
            console.log(e);
        }
    }

    const joinLobbyQuery = () => {
        setIsOpened(true);
    }

    return (
        <>
            <div className="popup" style={isOpened ? {display: "block"} : {display: "none"}}>
                    <li><label>Enter Lobby Id</label></li>
                    <li><input onChange={(e) => setLobbyText(e.target.value)}/></li>
                    <li><button onClick={() => joinLobbyQueryRequest()}>Submit</button></li>
            </div>
        <CanvasContainer>
            <DimensionContext.Provider value={dimensions}>
                <Pipe gapCoords={gapCoords}/>
                <Bird isSelf={true} birdCoords={INITIAL_STATE.player.birdCoords}/>
                <BoardBackground/>
            </DimensionContext.Provider>
            <NavigationMenu>
                <li> <button onClick={() => createLobby(1)}> Singleplayer </button> </li>
                <li> <button onClick={() => createLobby(2)}> Create Lobby </button> </li>
                <li> <button onClick={joinLobbyQuery}> Join Lobby </button> </li>
            </NavigationMenu>
        </CanvasContainer>
        </>
    )
}

