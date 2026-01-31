import z from "zod";

export const ResourceInsertSchema = z.array(
  z.object({
    action: z.enum([
      "restart",
      "manage",
      "assign",
      "view",
      "stop",
      "start",
      "delete",
      "list",
      "read",
      "create",
      "update",
      "delete",
      "view_logs",
      "invite",
      "remove",
      "revoke",
      "assign_role",
      "rotate",
      "activate",
      "deactivate",
    ]),
    resource: z.string().min(3).max(50),
    teamId: z.uuid("Invalid team ID format"),
    description: z.string().max(255).optional(),
    label: z.string().max(100).optional(),
    type: z.enum(["server", "team", "user"]),
  }),
);

export type ResourceInsertType = z.infer<typeof ResourceInsertSchema>;
