/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `user_access` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_access_id_user_key" ON "user_access"("id_user");
