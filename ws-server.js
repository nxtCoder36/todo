import { WebSocketServer } from "ws";
import http from 'http';

// const app = express();
const server = http.createServer();

const ws = new WebSocketServer({server });

ws.once('connection', () => {
    console.log("connected")
})

server.listen(":7778", (err) => {
    if (err) {
        console.error(err);
    }
    console.log("server listening on :7777")
})
