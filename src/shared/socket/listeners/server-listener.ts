import { Socket } from "socket.io";
import { MetricsType } from "../../types/metrics";

export const servers: { socket: Socket, clientId: string, jwt: string, lastSeenAt: Date, metrics: MetricsType }[] = []

export class ServerListener {
    private socket: Socket

    constructor(socket: Socket) {
        this.socket = socket
    }

    async registerServer() {
        const token = this.socket.data.server
        if (token) {
            servers.push({
                socket: this.socket, clientId: token.clientId, jwt: this.socket.handshake.headers.token as string, lastSeenAt: new Date(), metrics: {
                    uptime: process.uptime(),
                    memory: process.memoryUsage().rss,
                    timestamp: Date.now(),
                }
            })
            console.table(servers.map(s => ({ socket_id: s.socket.id, clientId: s.clientId, lastSeenAt: s.lastSeenAt, uptime: s.metrics.uptime })))
        }
    }

    updateServerStatus(payload: MetricsType) {
        const server = servers.find(s => s.socket.id === this.socket.id)
        if (server) {
            server.lastSeenAt = new Date()
            server.metrics = payload
        }
    }

    disconnectServer() {
        const index = servers.findIndex(s => s.socket.id === this.socket.id)

        if (index !== -1) servers.splice(index, 1)

        this.socket.emit("server-disconnected", "Server disconnected successfully")
    }
}