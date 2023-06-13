import { useEffect, useState } from "react";
import {socket} from 'ConnectionManager/Socket';

export function onSocketConnection() {



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

    return isConnected;
}