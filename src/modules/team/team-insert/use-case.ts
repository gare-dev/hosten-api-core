import { ResourceRepository } from "../../../shared/database/repositories/resource";
import { RoleRepository } from "../../../shared/database/repositories/role";
import { RolePermissionRepository } from "../../../shared/database/repositories/role-permission";
import { TeamRepository } from "../../../shared/database/repositories/team";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { getInitialPermissions } from "../../../utils/initial-permission";
import { getInitialRoles } from "../../../utils/initial-roles";
import { rolePermissionMap } from "../../../utils/role-permission-map";
import { TeamInsertInput } from "./schema";

function permissionKey(p: { resource: string; action: string }) {
    return `${p.resource}:${p.action}`;
}

export async function teamInsert(data: TeamInsertInput, ownerId: string) {
    const { teamInsert, getTeamByName } = TeamRepository()
    const { insertInitialRole } = RoleRepository()
    const { resourceInsert, getAllPermissionByTeamId } = ResourceRepository()
    const { insertInitialRoles } = RolePermissionRepository()
    const existingTeam = await getTeamByName(data.name);

    if (existingTeam) {
        return errorResponse("Team with this name already exists.", STATUS_CODES.CONFLICT);
    }

    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

    const newTeam = await teamInsert(data, ownerId, slug);

    const initialRoles = getInitialRoles(newTeam.id);

    const [roles, resources] = await Promise.all([
        insertInitialRole(initialRoles),
        resourceInsert(getInitialPermissions(newTeam.id))
    ])

    const teamPermissions = await getAllPermissionByTeamId(newTeam.id);

    const permissionMap = new Map(
        teamPermissions.map(p => [permissionKey(p), p.id])
    );

    for (const role of roles) {
        const permissionKeys = rolePermissionMap[role.name as keyof typeof rolePermissionMap];

        const permissionIds =
            permissionKeys[0] === "*"
                ? Array.from(permissionMap.values())
                : permissionKeys.map(key => {
                    const id = permissionMap.get(key);
                    if (!id) {
                        throw new Error(`Permission ${key} not found`);
                    }
                    return id;
                });

        await insertInitialRoles(role.id, permissionIds);
    }

    return successResponse({ newTeam }, STATUS_CODES.CREATED);
}