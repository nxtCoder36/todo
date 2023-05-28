import express, { Router } from  'express';
import {todoRouter} from "./app.js/todo.js";
import cors from "cors";
import http from 'http';
import {WebSocketServer} from 'ws';

const app = express();

const server = http.createServer(app)

app.use(express.json());

const port = process.env.PORT;
// app.use((req, res, next) => {
//     console.log(req.headers);
//     console.log("bbbbbbbbbbbb",req.body)
//     next();
// })
const socket = new WebSocketServer({ server })


app.use(cors());
app.use("/api", todoRouter(socket));

socket.on('connection', ws => {
    console.log('Connection opened')
    ws.on("close", () =>{
        console.log("WebSocket Closed")
    })
})

// console.log(socket.address())
// socket.on('listening', () => {
//     console.log('WebSocket server has started');
//   });
  
//   socket.on('close', () => {
//     console.log('WebSocket server has closed');
//   });
  

// socket.on("error", (err) => {
//     console.log(err)
// })

// socket.on("connection", (ws: WebSocketServer) => {
//     ws.on('message', (message: String) => {
//         console.log(`mesaage is ${message}`)
//     })
// });

// socket.addEventListener('open', event => {
//     console.log("WebSocket connection established")
// })

// socket.addEventListener('message', event => {
//     console.log(`Message Received: ${event.data}`)
// })

// socket.addEventListener('close', event => {
//     console.log("Connection Closed")
// })

// socket.addEventListener('error', event => {
//     console.log("Error: ", event)
// })

server.listen(port, "0.0.0.0", (err) => {
    if (err) {
        console.error("could not start server because", err);
    }
    console.log(`server started on addr :${port}`);
})