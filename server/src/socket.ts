import { Ack, ClientToServerEvents, CreateLobbyArgs, CreateLobbyResponse, Events, IdFields, JoinLobbyArgs, JoinLobbyResponse, ServerToClientEvents, StartGameArgs } from '@flappyblock/shared';
import { createLobby } from 'handlers/createLobby';
import { joinLobby } from 'handlers/joinLobby';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

const joinRooms = (data: Partial<IdFields>, socket: Socket) => {
    if (!data) return;
    if (data.lobbyId && data.playerId) {
        socket.join(data.lobbyId);
    }
    if (data.lobbyId) {
        socket.join(data.lobbyId);
    }
    if (data.playerId) {
        socket.join(data.playerId);
    }

  };
//socket.volatile.emit
io.on("connection", (socket) => {
    console.log("New connection: ",socket.id);

    socket.on(Events.CreateLobby, (args: CreateLobbyArgs, cb: Ack<CreateLobbyResponse>) => {
        createLobby(args, cb).then((data) => {
            joinRooms(data,socket);
            }).catch(e => {
                console.log(e);
            });
    })

    socket.on(Events.JoinLobby, (args: JoinLobbyArgs, cb: Ack<JoinLobbyResponse>) => {
        joinLobby(args, cb).then((data) => {
            joinRooms(data,socket);
            io.to(data.lobbyId).emit(Events.JoinLobby, data);
            }).catch(e => {
                console.log(e);
            });
    })

    socket.on(Events.StartGame, (args: StartGameArgs) => {
        io.to(args.lobbyId).emit(Events.StartGame);
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