import { RoleInsertType } from "../modules/role/role-insert/schema";

export function getInitialRoles(newTeamId: string): RoleInsertType[] {
    return [
        {
            name: "owner",
            teamId: newTeamId,
            description: "Team Owner with full permissions"
        },
        {
            name: "member",
            teamId: newTeamId,
            description: "Regular team member with standard permissions"
        },
        {
            name: "viewer",
            teamId: newTeamId,
            description: "Read-only access to team resources"
        },
        {
            name: "admin",
            teamId: newTeamId,
            description: "Team Administrator with elevated permissions"
        }
    ]
}