import { ResourceInsertType } from "../modules/resource/resource-insert/schema";

export function getInitialPermissions(teamId: string): ResourceInsertType {
    return [
        // ─────────────────────────────
        // TEAM
        // ─────────────────────────────
        {
            resource: "team",
            action: "read",
            type: "team",
            description: "View team details",
            label: "View Team",
            teamId,
        },
        {
            resource: "team",
            action: "update",
            type: "team",
            description: "Update team settings",
            label: "Update Team",
            teamId,
        },
        {
            resource: "team",
            action: "delete",
            type: "team",
            description: "Delete the team",
            label: "Delete Team",
            teamId,
        },
        // ─────────────────────────────
        // MEMBERS
        // ─────────────────────────────
        {
            resource: "member",
            action: "read",
            type: "team",
            description: "View team members",
            label: "View Members",
            teamId,
        },
        {
            resource: "member",
            action: "invite",
            type: "team",
            description: "Invite new members to the team",
            label: "Invite Members",
            teamId,
        },
        {
            resource: "member",
            action: "remove",
            type: "team",
            description: "Remove members from the team",
            label: "Remove Members",
            teamId,
        },
        {
            resource: "member",
            action: "assign_role",
            type: "team",
            description: "Assign roles to team members",
            label: "Assign Roles",
            teamId,
        },
        // ─────────────────────────────
        // INVITATIONS
        // ─────────────────────────────
        {
            resource: "invitation",
            action: "create",
            type: "team",
            description: "Create team invitations",
            label: "Create Invitations",
            teamId,
        },
        {
            resource: "invitation",
            action: "read",
            type: "team",
            description: "View pending invitations",
            label: "View Invitations",
            teamId,
        },
        {
            resource: "invitation",
            action: "revoke",
            type: "team",
            description: "Revoke pending invitations",
            label: "Revoke Invitations",
            teamId,
        },
        // ─────────────────────────────
        // ROLES
        // ─────────────────────────────
        {
            resource: "role",
            action: "read",
            type: "team",
            description: "View team roles",
            label: "View Roles",
            teamId,
        },
        {
            resource: "role",
            action: "create",
            type: "team",
            description: "Create new roles",
            label: "Create Roles",
            teamId,
        },
        {
            resource: "role",
            action: "update",
            type: "team",
            description: "Update existing roles",
            label: "Update Roles",
            teamId,
        },
        {
            resource: "role",
            action: "delete",
            type: "team",
            description: "Delete roles",
            label: "Delete Roles",
            teamId,
        },
        // ─────────────────────────────
        // PERMISSIONS
        // ─────────────────────────────
        {
            resource: "permission",
            action: "manage",
            type: "team",
            description: "Manage permissions",
            label: "Manage Permissions",
            teamId,
        },
        // ─────────────────────────────
        // SERVERS
        // ─────────────────────────────
        {
            resource: "server",
            action: "create",
            type: "server",
            description: "Create servers",
            label: "Create Servers",
            teamId,
        },
        {
            resource: "server",
            action: "read",
            type: "server",
            description: "View servers",
            label: "View Servers",
            teamId,
        },
        {
            resource: "server",
            action: "update",
            type: "server",
            description: "Update server settings",
            label: "Update Servers",
            teamId,
        },
        {
            resource: "server",
            action: "delete",
            type: "server",
            description: "Delete servers",
            label: "Delete Servers",
            teamId,
        },
        {
            resource: "server",
            action: "activate",
            type: "server",
            description: "Activate servers",
            label: "Activate Servers",
            teamId,
        },
        {
            resource: "server",
            action: "deactivate",
            type: "server",
            description: "Deactivate servers",
            label: "Deactivate Servers",
            teamId,
        },
        {
            resource: "server",
            action: "manage",
            type: "server",
            description: "Manage servers",
            label: "Manage Servers",
            teamId,
        },
        // ─────────────────────────────
        // CREDENTIALS (SENSÍVEL)
        // ─────────────────────────────
        {
            resource: "credential",
            action: "read",
            type: "server",
            description: "View client credentials",
            label: "View Credentials",
            teamId,
        },
        {
            resource: "credential",
            action: "rotate",
            type: "server",
            description: "Rotate client secret",
            label: "Rotate Credentials",
            teamId,
        },
        // ─────────────────────────────
        // PERMISSIONS (ADMIN / OWNER)
        // ─────────────────────────────
        {
            resource: "permission",
            action: "read",
            type: "team",
            description: "View permissions",
            label: "View Permissions",
            teamId,
        },
        {
            resource: "permission",
            action: "assign",
            type: "team",
            description: "Assign permissions to roles",
            label: "Assign Permissions",
            teamId,
        },
        // ─────────────────────────────
        // PROCESSES)
        // ─────────────────────────────
        {
            resource: "processes",
            action: "read",
            type: "team",
            description: "View processes",
            label: "View Processes",
            teamId,
        },
        {
            resource: "processes",
            action: "start",
            type: "team",
            description: "Start processes",
            label: "Start Processes",
            teamId,
        },
        {
            resource: "processes",
            action: "stop",
            type: "team",
            description: "Stop processes",
            label: "Stop Processes",
            teamId,
        },
        {
            resource: "processes",
            action: "restart",
            type: "team",
            description: "Restart processes",
            label: "Restart Processes",
            teamId,
        },
        {
            resource: "processes",
            action: "delete",
            type: "team",
            description: "Delete processes",
            label: "Delete Processes",
            teamId,
        },
        {
            resource: "processes",
            action: "view_logs",
            type: "team",
            description: "View process logs",
            label: "View Process Logs",
            teamId,
        },
        {
            resource: "processes",
            action: "manage",
            type: "team",
            description: "Manage processes",
            label: "Manage Processes",
            teamId,
        },
    ];
}
