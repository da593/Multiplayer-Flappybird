import { io } from 'socket.io-client';


export const socket = io('http://localhost:4000', {
    autoConnect: false,
    withCredentials: true,
});

socket.on("update clients", (gameState) => {
    console.log(gameState)
})

