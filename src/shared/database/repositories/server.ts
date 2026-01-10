import { ServerMaxAggregateOutputType } from "../../../generated/prisma/models";
import { ServerAuthSchemaType } from "../../../modules/servers/server-auth/schema";
import { ServerInsertSchemaType } from "../../../modules/servers/server-insert/schema";
import prisma from "../index"

export const ServerRepository = () => {
    const serverAuth = async (data: Omit<ServerAuthSchemaType, "clientSecret">) => {
        return await prisma.server.findFirst({
            where: { clientId: data.clientId, isActive: true },
        });
    }

    const serverInsert = async (data: ServerInsertSchemaType, clientSecret: string): Promise<ServerMaxAggregateOutputType> => {
        return await prisma.server.create({
            data: { ...data, clientSecret }
        });
    }

    const getServerByName = async (name: string): Promise<ServerMaxAggregateOutputType | null> => {
        return await prisma.server.findFirst({
            where: { name }
        });
    }

    return {
        serverAuth,
        serverInsert,
        getServerByName
    }
}