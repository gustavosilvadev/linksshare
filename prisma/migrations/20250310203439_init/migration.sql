/*
  Warnings:

  - The `status_group` column on the `GroupUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `UserAccess` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GroupUser" DROP COLUMN "status_group",
ADD COLUMN     "status_group" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "UserAccess" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
