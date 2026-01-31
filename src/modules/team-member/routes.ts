import express, { Request, Response } from "express";
import { teamSelectById } from "../team/team-select-by-id/use-case";
import { teamSelectByTeamId } from "./team-member-select-by-teamid/use-case";
import checkPermission from "../../shared/infra/http/middleware/check-permission";

const teamMemberRoutes = express.Router();

teamMemberRoutes.get(
  "/:teamId/members",
  checkPermission,
  async (req: Request, res: Response) => {
    const { teamId } = req.params;

    const teamMembers = await teamSelectByTeamId(teamId as string); // adicionar validacao de verdade

    return res.status(teamMembers.code).json({ ...teamMembers });
  },
);

export default teamMemberRoutes;
