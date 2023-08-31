'use client';

import  { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DimensionContext } from 'hooks/DimensionsContext';
import { useGapCoords } from "hooks/useGapCoords";
import { ERROR, Events, GAME_DIMENSIONS, INITIAL_STATE } from '@flappyblock/shared';
import { SocketContext } from 'hooks/socketContext';
import { Pipe } from 'components/Pipe';
import { Bird } from './components/Bird';
import { BoardBackground } from 'components/background';
import { NavigationMenu } from 'components/NavigationMenu';
import { useRouter, notFound  } from 'next/navigation';
import { selectLobby, updateLobby } from '@/lobby/[id]/lobbySlice';
import { CanvasContainer } from 'components/CanvasContainer';

export default function HomePage() {
    const socket = useContext(SocketContext);
    const dimensions = GAME_DIMENSIONS;
    const lobbyData = useSelector(selectLobby);
    const gapCoords = useGapCoords(dimensions);
    const [isOpened,setIsOpened] = useState(false);
    const [openInstructions, setOpenInstructions] = useState(false);
    const [failedLobby, setFailedLobby] = useState(false);
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
            dispatch(updateLobby({...response, type: maxPlayers > 1 ? "multiplayer" : "singleplayer"}));
            navigate(response.lobbyId);
        } 
        catch (e) {
            throw (notFound);
        }
    }

    const joinLobbyQueryRequest = async () => {
        try {
            const lobbyId = lobbyText;
            const response = await socket.emitWithAck(Events.JoinLobby, {lobbyId: lobbyId, socketId: socket.id});
            if (response.lobbyId === ERROR.LOBBY_NOT_FOUND) {
                setFailedLobby(true);
                setTimeout(() => {
                    setFailedLobby(false);
                }, 5000)
            }
            else {
                dispatch(updateLobby({...response, type: "multiplayer"}));
                navigate(response.lobbyId);
            }
        } 
        catch (e) {
            throw (notFound);
        }
    }

    return (
        <>
        <div className="popup" style={isOpened && !openInstructions ? {display: "block"} : {display: "none"}}>
                <button className="interactive" onClick={() => setIsOpened(false)}>X</button>
                <li><label>Enter Lobby Id</label></li>
                <li><input onChange={(e) => setLobbyText(e.target.value)} placeholder="Enter lobby Id..."/></li>
                <li><p style={{color: "red", fontSize:"x-large", display: failedLobby ? "block" : "none"}}>Lobby Not Found!</p></li>
                <li><button onClick={() => joinLobbyQueryRequest()}>Submit</button></li>
        </div>
        <div className="popup" style={openInstructions && !isOpened ? {display: "block"} : {display: "none"}}>
                <button className="interactive" onClick={() => setOpenInstructions(false)}>X</button>
                <li><label>How To Play</label></li>
                <li><p>The goal is to avoid the obstacles by navigating your block through gaps and to go as far you can! Press &#87; or &#8593; to move your block up!</p></li>
        </div>
        <CanvasContainer>
            <DimensionContext.Provider value={dimensions}>
                <Pipe gapCoords={gapCoords}/>
                <Bird isSelf={true} birdCoords={INITIAL_STATE.player.birdCoords}/>
                <BoardBackground/>
            </DimensionContext.Provider>
            <NavigationMenu>
                <li> <button onClick={() => !isOpened ? setOpenInstructions(true) : null}> How To Play </button> </li>
                <li> <button onClick={() => createLobby(1)}> Singleplayer </button> </li>
                <li> <button onClick={() => createLobby(2)}> Create Lobby </button> </li>
                <li> <button onClick={() => !openInstructions ? setIsOpened(true) : null}> Join Lobby </button> </li>
            </NavigationMenu>
        </CanvasContainer>
        </>
    )
}

