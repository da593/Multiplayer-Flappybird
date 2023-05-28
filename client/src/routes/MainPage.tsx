import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { BoardBackground } from "GameBoard/background";
import { NavigationMenu } from "NavigationMenu";
import { BodyContainer } from "./BodyContainer";
import { Pipe } from "GameBoard/Pipe";
import { useGapCoords } from "hooks/useGapCoords";
import { Bird } from "GameBoard/Bird";
import { INITAL_STATE } from 'GameState/constants';
import {socket} from 'ConnectionManager/Socket';
export function MainPage() {

    const gapCoords = useGapCoords();
    const [isConnected, setIsConnected] = useState(socket.connected);

    function connect() {
        socket.connect();
      }
    
      function disconnect() {
        socket.disconnect();
      }

    useEffect(() => {
      function onConnect() {
        setIsConnected(true);
      }
  
      function onDisconnect() {
        setIsConnected(false);
      }
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      }

    }, [])
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    return (
        <BodyContainer>
            <Pipe gapCoords={gapCoords}/>
            <Bird birdCoords={INITAL_STATE.birdCoords}/>
            <BoardBackground/>
            <NavigationMenu>
                <li><Link to="/gamepage" state={{players:1}} onClick={connect}>1-player</Link></li>
                <li><Link to="/gamepage" state={{players:2}} onClick={connect}>2-players</Link></li>
            </NavigationMenu>
        </BodyContainer>
    )
}

