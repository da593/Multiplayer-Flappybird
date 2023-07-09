import { Ack, ClientToServerEvents, CreateLobbyArgs, CreateLobbyResponse, Events, IdFields, ServerToClientEvents } from '@flappyblock/shared';
import { createLobby } from 'handlers/createLobby';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

const joinRooms = (data: Partial<IdFields>, socket: Socket) => {
    if (!data) return;
    if (data.lobbyId) socket.join(data.lobbyId);
    if (data.playerId) socket.join(data.playerId);
  };

io.on("connection", (socket) => {
    console.log("New connection: ",socket.id);

    socket.on(Events.CreateLobby, (args: CreateLobbyArgs, cb: Ack<CreateLobbyResponse>) => {
        createLobby(args, cb).then((data) => {
            console.log(data);
            joinRooms(data,socket);
            }).catch(e => {
                console.log(e);
            });
    })

})


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