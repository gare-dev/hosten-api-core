import { ServerRepository } from "../../../shared/database/repositories/server";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { servers as connectedServersList } from "../../../shared/socket/listeners/server-listener"


export async function serverSelect() {
    const { serverSelect } = ServerRepository()

    const servers = await serverSelect();

    const mergedServers = servers.map(server => {
        const connectedServer = connectedServersList.find(s => s.clientId === server.clientId);

        return {
            connected: !!connectedServer,
            id: server.id,
            name: server.name,
            environment: server.environment,
            host: server.host,
            description: server.description,
            clientId: server.clientId,
            isActive: server.isActive,
            createdAt: server.createdAt,
            updatedAt: server.updatedAt,
            ...(connectedServer && {
                lastSeenAt: connectedServer.lastSeenAt,
                metrics: connectedServer.metrics
            })
        };
    });

    return successResponse({ servers: mergedServers }, STATUS_CODES.OK);
}