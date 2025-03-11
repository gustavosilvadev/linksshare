/*
  Warnings:

  - You are about to drop the column `preview_after_click` on the `Link` table. All the data in the column will be lost.
  - Added the required column `preview_before_click` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "preview_after_click",
ADD COLUMN     "preview_before_click" TEXT NOT NULL;
