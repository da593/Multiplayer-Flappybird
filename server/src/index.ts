import 'dotenv/config';
import express, {Request, Response} from 'express';
import http from 'http';
import cors from 'cors';
import { GAME_DIMENSIONS } from '@flappyblock/shared';
import { attachSocket } from "#@/socket.js";



const app = express();
const httpserver = http.createServer(app);
attachSocket(httpserver);

httpserver.listen(4000, () => {
  console.log('listening on :4000');
});

app.use(cors());
const orig = process.env.LOCAL_PORT_REQUEST;
const corsOptions = {
  origin: orig,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api', cors(corsOptions), (req: Request, res: Response) => {
  res.send(GAME_DIMENSIONS);
});

