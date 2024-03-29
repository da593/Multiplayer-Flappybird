import 'dotenv/config';
import { Ack, ClientToServerEvents, CreateLobbyArgs, LobbyResponse, Events, IdFields, JoinLobbyArgs, LeaveLobbyArgs, ServerToClientEvents, StartGameArgs, game_tick, ping_rate, ERROR, GameData } from '@flappyblock/shared';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { clearInterval } from 'timers';
import { removeSocket } from '#@/handlers/removeSocket.js';
import { createLobby } from '#@/handlers/createLobby.js';
import { joinLobby } from '#@/handlers/joinLobby.js';
import { playerInput } from '#@/handlers/playerInput.js';
import { startGame } from '#@/handlers/startGame.js';
import { updateGame } from '#@/handlers/updateGame.js';
import { lobbyManager } from '#@/Managers/LobbyManager.js';
import { endGame } from '#@/handlers/endGame.js';
import { resetGame } from '#@/handlers/resetGame.js';
import { leaveLobby } from '#@/handlers/leaveLobby.js';


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

io.on("connection", (socket) => {
    console.log("New connection: ",socket.id);

    let isConnected = true;
    let shouldEnd = false;
    socket.on("disconnect", () => {
        console.log("Lost Connection", socket.id);
        isConnected = false;
        removeSocket(socket.id);
    })

    socket.on(Events.CreateLobby, (args: CreateLobbyArgs, cb: Ack<LobbyResponse>) => {
        createLobby(args, cb).then((data) => {
            joinRooms(data,socket);
        }).catch(e => {
            console.log(e);
        });
    })

    socket.on(Events.JoinLobby, (args: JoinLobbyArgs, cb: Ack<LobbyResponse>) => {
        joinLobby(args, cb).then((data) => {
            if (data.lobbyId !== ERROR.LOBBY_NOT_FOUND) {
                joinRooms(data,socket);
                io.to(data.lobbyId).emit(Events.LobbyDataToAllClients, data);
            }
        }).catch(e => {
            console.log(e);
        });
    })

    socket.on(Events.StartGame, (args: StartGameArgs) => {
        const {lobbyId} = args;
        const numReady = startGame(args);
        io.to(args.lobbyId).emit(Events.StartGame, numReady);

        const emitGameState = (lobbyId: string) => {
            const lobby = lobbyManager.getLobby(lobbyId);
            const game = lobby?.getGame();
            let hasStarted = false;
            if (game) {
                shouldEnd = game.shouldEnd;
                hasStarted = game.getHasStarted();
            }
            if (shouldEnd) {
                endGame(lobbyId).then((data) => {
                    io.to(lobbyId).emit(Events.EndGame, data);
                }).catch(e => {
                    console.log(e);
                })
            }
            else if (hasStarted) {
                updateGame(lobbyId).then((data: GameData) => {
                    io.to(socket.id).volatile.emit(Events.UpdateGame, data);
                }).catch(e => {
                    console.log(e);
                })
            }
        }

        emitGameState(lobbyId);
        const timerId = setInterval(() => {
            if (!isConnected || shouldEnd) {
                clearInterval(timerId);
            }
            emitGameState(lobbyId);
        }, game_tick);

    });

    socket.on(Events.PlayerInput, (args: IdFields) => {
        playerInput(args.lobbyId, args.playerId);
    });

    socket.on(Events.LeaveLobby, (args: LeaveLobbyArgs) => {
        leaveLobby(args).then((data) => {
            io.to(data.lobbyId).emit(Events.LobbyDataToAllClients, data);
            socket.leave(data.lobbyId);
            shouldEnd = true;
        })
    });

    socket.on(Events.ResetGame, (args: StartGameArgs) => {
        const numReady = resetGame(args);
        io.to(args.lobbyId).emit(Events.ResetGame, numReady);
    });

})


export function attachSocket(server: HttpServer): void {
    io.attach(server, {
        cors: getCorsOptions(),
    });
}

export function getCorsOptions() {
    const orig = process.env.PORT_REQUEST;
    return  {
        origin: orig,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
}