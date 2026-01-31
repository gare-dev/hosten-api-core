import { RoleInsertType } from "../../../modules/role/role-insert/schema";
import prisma from "../index";

export const RoleRepository = () => {
  const roleInsert = async (data: RoleInsertType) => {
    return await prisma.role.create({
      data: { ...data },
    });
  };

  const insertInitialRole = async (data: RoleInsertType[]) => {
    return Promise.all(data.map((role) => prisma.role.create({ data: role })));
  };

  const roleSelect = async () => {
    return await prisma.role.findMany();
  };

  const roleDelete = async (id: string) => {
    return await prisma.role.delete({
      where: { id },
    });
  };

  const getRoleIdByNameAndTeamId = async (name: string, teamId: string) => {
    return await prisma.role.findFirst({
      where: { name, teamId },
      select: { id: true },
    });
  };

  return {
    roleInsert,
    insertInitialRole,
    roleSelect,
    roleDelete,
    getRoleIdByNameAndTeamId,
  };
};
