-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_id_user_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
