import { Socket } from "socket.io";
import { envs } from "../../../config/env";
import jwt from "jsonwebtoken";
import { ca } from "zod/locales";

export function socketAuth(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.headers.token as string

    if (!token) return next(new Error("Authentication error: Token not provided"))

    try {
        const decoded = jwt.verify(token, envs.TOKEN_KEY)
        socket.data.user = decoded
        next()
    } catch (err) {
        return next(new Error("Authentication error: Invalid token"))
    }
}