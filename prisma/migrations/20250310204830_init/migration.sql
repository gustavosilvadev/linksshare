/*
  Warnings:

  - Changed the type of `user_admin` on the `UserAccess` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserAccess" DROP COLUMN "user_admin",
ADD COLUMN     "user_admin" BOOLEAN NOT NULL;
