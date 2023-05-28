import express, {Request, Response} from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";
import { GAME_DIMENSIONS, INITAL_STATE } from 'GameState/constants';
import { GameState, GameStateProcessor } from 'GameState';
import { GameState_I } from 'GameState/types';

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver,{
  cors: {
    origin: ["http://localhost:3000","http://localhost:3000/gamepage"],
    credentials: true,
  }
});

const gameProcessor = new GameStateProcessor();

app.get('/', (req: Request, res: Response) => {
  res.send(GAME_DIMENSIONS);
});

io.on('connection', (socket:Socket) => {
 
  
  socket.on("keyboard event", (event) => {
  });

setInterval(() => {
  io.emit("update clients", )
},100);

});



httpserver.listen(4000, () => {
  console.log('listening on :4000');
});