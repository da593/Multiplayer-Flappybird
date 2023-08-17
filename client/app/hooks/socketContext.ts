'use client';

import { ServerToClientEvents, ClientToServerEvents } from "@flappyblock/shared";
import {createContext} from "react";
import io, { Socket } from "socket.io-client";

function getApi(): string {
    const res = process.env.NEXT_PUBLIC_PORT_API;
    if (res === undefined) {
        throw new Error("Cannot find API");
    }
    return res;
}

const baseUrl: string = getApi();
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(baseUrl);
export const SocketContext = createContext(socket);