import { ClientToServerEvents, ServerToClientEvents } from 'handlers/types';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

export function attachSocket(server: HttpServer) {
    const domain = process.env.LOCAL_PORT_REQUEST;
    const corsOptions = {
        origin: domain,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    
    io.attach(server, {
        cors: corsOptions
    });
}

io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
});
  
