import { Server } from "socket.io";
import { httpServer } from "./server";
import { socketAuth } from "../infra/http/middleware/socket-auth";


export class SocketIO {
    private socket: Server

    constructor() {
        this.socket = new Server(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            }
        })
        this.socket.use(socketAuth)
    }

    private setUpServer() {
        this.socket.on("connection", (socket) => {
            const user = socket.data.user




        })
    }
}