'use client';

import { updateLobby } from '@/lobby/[id]/lobbySlice';
import { ERROR, Events, INITIAL_STATE } from '@flappyblock/shared';
import { NavigationMenu } from 'components/NavigationMenu';
import { BoardBackground } from 'components/background';
import { SocketContext } from 'hooks/socketContext';
import { notFound, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bird } from './components/Bird';
import { DivContainer } from './components/DivContainer';
import { LobbyAlert } from './components/LobbyAlert';
import { Pipe } from './components/Pipe';
import { useRAFCoords } from './hooks/useRAFCoords';

export default function HomePage() {
    const socket = useContext(SocketContext);
    const [isOpened,setIsOpened] = useState(false);
    const [openInstructions, setOpenInstructions] = useState(false);
    const [hasFoundLobby, setHasFoundLobby] = useState(false);
    const [displayLobbyAlert, setDisplayLobbyAlert] = useState(false);
    const [lobbyText,setLobbyText] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const gapCoords = useRAFCoords();
    
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
                setHasFoundLobby(false);
            }
            else {
                setHasFoundLobby(true);
                dispatch(updateLobby({...response, type: "multiplayer"}));
                navigate(response.lobbyId);
            }
            setDisplayLobbyAlert(true)
            setTimeout(() => {
                setDisplayLobbyAlert(false);
            }, 5000)
        } 
        catch (e) {
            throw (notFound);
        }
    }

    return (
        <>
        {isOpened && !openInstructions ? <DivContainer className="popup">
            <button className="interactive" onClick={() => setIsOpened(false)}>
                    X
                </button>
                <li><label>Enter Lobby Id</label></li>
                <li><input onChange={(e) => setLobbyText(e.target.value)} placeholder="Enter lobby Id..."/></li>
                {displayLobbyAlert ? <LobbyAlert isSuccess={hasFoundLobby}/> : null}
                <li>
                    <button onClick={() => joinLobbyQueryRequest()}>
                    Submit
                    </button>
                </li>
        </DivContainer> : null}

        {!isOpened && openInstructions ? <DivContainer className="popup">
            <button className="interactive" onClick={() => setOpenInstructions(false)}>
                    X
                </button>
                <li><label>How To Play</label></li>
                <li>
                    <p>
                        The goal is to go as far you can by navigating through gaps between obstacles! 
                        Press touch-screen, left-mouse-button, &#87;, or  &#8593; to move your block up!
                    </p>
                </li>
        </DivContainer>: null}
        
        <DivContainer className="canvas-container">
                <Pipe gapCoords={gapCoords}/>
                <Bird isSelf={true} birdCoords={INITIAL_STATE.player.birdCoords} hasCollided={false}/>
                <BoardBackground/>
            <NavigationMenu>
                <li> <button onClick={() => !isOpened ? setOpenInstructions(true) : null}> How To Play </button> </li>
                <li> <button onClick={() => createLobby(1)}> Singleplayer </button> </li>
                <li> <button onClick={() => createLobby(2)}> Create Lobby </button> </li>
                <li> <button onClick={() => !openInstructions ? setIsOpened(true) : null}> Join Lobby </button> </li>
            </NavigationMenu>
        </DivContainer>
        </>
    )
}

