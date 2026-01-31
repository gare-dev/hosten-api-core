-- AlterTable
ALTER TABLE "Role" ADD COLUMN "description" TEXT DEFAULT '';

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Permission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "label" TEXT DEFAULT '',
    "type" TEXT NOT NULL
);
INSERT INTO "new_Permission" ("action", "description", "id", "label", "resource", "teamId", "type") SELECT "action", "description", "id", "label", "resource", "teamId", "type" FROM "Permission";
DROP TABLE "Permission";
ALTER TABLE "new_Permission" RENAME TO "Permission";
CREATE UNIQUE INDEX "Permission_resource_action_key" ON "Permission"("resource", "action");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
