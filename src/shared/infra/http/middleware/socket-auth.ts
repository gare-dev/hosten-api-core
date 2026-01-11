import { Socket } from "socket.io";
import { envs } from "../../../config/env";
import jwt from "jsonwebtoken";

export function socketAuth(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.headers.token as string

    if (!token) {
        console.log("No token provided in socket handshake headers");
        return next(new Error("Authentication error: Token not provided"))
    }

    try {
        const decoded = jwt.verify(token, envs.JWT_TOKEN)
        socket.data.server = decoded
        next()
    } catch (err) {
        return next(new Error("Authentication error: Invalid token"))
    }
}