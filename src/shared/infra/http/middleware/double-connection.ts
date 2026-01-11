import { Socket } from "socket.io";
import { servers } from "../../../socket/listeners/server-listener";

export function doubleConnection(socket: Socket, next: (err?: Error) => void) {
    const server = servers.find(s => s.clientId === socket.data.server.clientId)

    if (server) return next(new Error("Double connection error: Server is already connected"))

    next()
}