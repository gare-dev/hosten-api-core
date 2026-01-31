/*
  Warnings:

  - You are about to drop the column `description` on the `TeamMemberPermission` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `TeamMemberPermission` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TeamMemberPermission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "memberId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resourceId" TEXT,
    CONSTRAINT "TeamMemberPermission_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "TeamMember" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TeamMemberPermission" ("action", "id", "memberId", "resourceId") SELECT "action", "id", "memberId", "resourceId" FROM "TeamMemberPermission";
DROP TABLE "TeamMemberPermission";
ALTER TABLE "new_TeamMemberPermission" RENAME TO "TeamMemberPermission";
CREATE INDEX "TeamMemberPermission_memberId_idx" ON "TeamMemberPermission"("memberId");
CREATE UNIQUE INDEX "TeamMemberPermission_memberId_action_resourceId_key" ON "TeamMemberPermission"("memberId", "action", "resourceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
