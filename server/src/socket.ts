import { Ack, ClientToServerEvents, CreateLobbyArgs, CreateLobbyResponse, Events, IdFields, JoinLobbyArgs, JoinLobbyResponse, LeaveLobbyArgs, ServerToClientEvents, StartGameArgs, game_tick } from '@flappyblock/shared';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { clearInterval } from 'timers';
import { removeSocket } from '#@/handlers/removeSocket.js';
import { createLobby } from '#@/handlers/createLobby.js';
import { joinLobby } from '#@/handlers/joinLobby.js';
import { playerInput } from '#@/handlers/playerInput.js';
import { removePlayer } from '#@/handlers/removePlayer.js';
import { startGame } from '#@/handlers/startGame.js';
import { updateGame } from '#@/handlers/updateGame.js';


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
process.on('warning', e => console.warn(e.stack));
//run build if socket keeps creating a new connection
io.on("connection", (socket) => {
    console.log("New connection: ",socket.id);


    let isConnected = true;
    socket.on("disconnect", () => {
        console.log("Lost Connection", socket.id);
        isConnected = false;
        removeSocket(socket.id);
    })

    const getPing = (start: number): number => {
        let latency = 0;
        io.emit(Events.GetLatency, () => {
            latency = Date.now() - start;
            console.log(latency);
        });
        return latency;
    }

    socket.on(Events.CreateLobby, (args: CreateLobbyArgs, cb: Ack<CreateLobbyResponse>) => {
        createLobby(args, cb).then((data) => {
            joinRooms(data,socket);
        }).catch(e => {
            console.log(e);
        });

        let latency = getPing(Date.now());
        const id = setInterval(() => {
            if (latency > 5000 || !isConnected) { 
                clearInterval(id);
                console.log("clear ping create"); 
            }
            latency = getPing(Date.now());
        }, 25000);   
    })

    socket.on(Events.JoinLobby, (args: JoinLobbyArgs, cb: Ack<JoinLobbyResponse>) => {
        joinLobby(args, cb).then((data) => {
            joinRooms(data,socket);
            io.to(data.lobbyId).emit(Events.JoinLobby, data);
            }).catch(e => {
                console.log(e);
            });

            let latency = getPing(Date.now());
            const id = setInterval(() => {
                if (latency > 5000 || !isConnected) { 
                    clearInterval(id);
                    console.log("clear ping join"); 
                }
                latency = getPing(Date.now());
            }, 25000);  
    })

    socket.on(Events.StartGame, (args: StartGameArgs) => {
        const {lobbyId, shouldEnd} = args;
        io.to(lobbyId).emit(Events.StartGame);
        startGame(lobbyId);
        
        const timerId = setInterval(() => {
            if (shouldEnd || !isConnected) {
                clearInterval(timerId);
                console.log("clear start");
            }
            updateGame(lobbyId).then((data) => {
                io.to(lobbyId).volatile.emit(Events.UpdateGame, data);
            }).catch(e => {
                console.log(e);
            })
        }, game_tick);
    })

    socket.on(Events.PlayerInput, (args: IdFields) => {
        playerInput(args.lobbyId, args.playerId);
    })

    socket.on(Events.LeaveLobby, (args: LeaveLobbyArgs) => {
        isConnected = false;
        removePlayer(args.socketId);
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