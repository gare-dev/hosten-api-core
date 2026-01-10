/*
  Warnings:

  - You are about to drop the `Server` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Server";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "server" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "host" TEXT,
    "description" TEXT,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "server_name_key" ON "server"("name");

-- CreateIndex
CREATE UNIQUE INDEX "server_clientId_key" ON "server"("clientId");
