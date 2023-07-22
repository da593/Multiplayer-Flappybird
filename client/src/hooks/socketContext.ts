import { ServerToClientEvents, ClientToServerEvents } from "@flappyblock/shared";
import { baseUrl } from "api/axios";
import React from "react";
import io, { Socket } from "socket.io-client";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(baseUrl);
export const SocketContext = React.createContext(socket);