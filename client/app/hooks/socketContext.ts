'use client';

import { ServerToClientEvents, ClientToServerEvents } from "@flappyblock/shared";
import {createContext} from "react";
import io, { Socket } from "socket.io-client";

const baseUrl: string = process.env.NEXT_PUBLIC_PORT_API;
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(baseUrl);
export const SocketContext = createContext(socket);