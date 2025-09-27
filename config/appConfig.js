
import express from 'express'
import { Server } from 'socket.io'
import {createServer} from 'node:http'
import cors from 'cors'

const app = express()
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


app.use(cors());
app.use(express.json());

export {app, io, server}


