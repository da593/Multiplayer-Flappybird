import 'dotenv/config';
import express, {Request, Response} from 'express';
import http from 'http';
import cors from 'cors';
import { attachSocket, getCorsOptions } from "#@/socket.js";



const app = express();
const httpserver = http.createServer(app);
attachSocket(httpserver);

const port = 4000;

httpserver.listen(port, () => {
  console.log("listening on :", port);
});

app.use(cors());
app.get('/', cors(getCorsOptions()), (req: Request, res: Response) => {
  res.send("up");
});

