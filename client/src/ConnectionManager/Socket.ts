import axios from 'axios';
import { io } from 'socket.io-client';


let baseUrl:string

process.env.NODE_ENV === "development" ? baseUrl = process.env.REACT_APP_LOCAL_PORT_API : baseUrl =process.env.REACT_APP_PROD_PORT_API;


const axiosClient = axios.create({
    baseURL: baseUrl ,
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_TOKEN : process.env.REACT_APP_AUTH_KEY,
    },
})

export async function getData(endpoint:string) {
    return await axiosClient.get(endpoint);
}

export const socket = io(baseUrl, {
    autoConnect: false,
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

