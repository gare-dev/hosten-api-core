export const rolePermissionMap = {
    viewer: [
        // TEAM
        "team:read",

        // MEMBERS
        "member:read",

        // INVITATIONS
        "invitation:read",

        // ROLES
        "role:read",

        // SERVERS
        "server:read",
    ],

    member: [
        // TEAM
        "team:read",

        // MEMBERS
        "member:read",

        // INVITATIONS
        "invitation:read",

        // ROLES
        "role:read",

        // SERVERS
        "server:create",
        "server:read",
        "server:update",
        "server:activate",
        "server:deactivate",

        // ⚠️ propositalmente NÃO pode:
        // - delete server
        // - credentials
    ],

    admin: [
        // TEAM
        "team:read",
        "team:update",

        // MEMBERS
        "member:read",
        "member:invite",
        "member:remove",
        "member:assign_role",

        // INVITATIONS
        "invitation:create",
        "invitation:read",
        "invitation:revoke",

        // ROLES
        "role:read",
        "role:create",
        "role:update",
        "role:delete",

        // SERVERS
        "server:create",
        "server:read",
        "server:update",
        "server:delete",
        "server:activate",
        "server:deactivate",

        // CREDENTIALS
        "credential:read",
        "credential:rotate",

        // PERMISSIONS
        "permission:read",
        "permission:assign",
    ],

    owner: [
        "*",
    ],
};
