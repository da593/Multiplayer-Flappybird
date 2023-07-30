import 'dotenv/config';
import express, {Request, Response} from 'express';
import http from 'http';
import cors from 'cors';
import { GAME_DIMENSIONS } from '@flappyblock/shared';
import { attachSocket } from "#@/socket.js";



const app = express();
const httpserver = http.createServer(app);
attachSocket(httpserver);

const port = 4000;

httpserver.listen(port, () => {
  console.log("listening on :", port);
});

app.use(cors());
const orig = process.env.NODE_ENV === "production" ? process.env.PROD_PORT_REQUEST : process.env.DEV_PORT_REQUEST;
const corsOptions = {
  origin: orig,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api', cors(corsOptions), (req: Request, res: Response) => {
  res.send(GAME_DIMENSIONS);
});

