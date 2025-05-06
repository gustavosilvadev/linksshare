-- AlterTable
ALTER TABLE "link" ADD COLUMN     "href_shortener" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "log_click_link" (
    "id" UUID NOT NULL,
    "link_id" UUID NOT NULL,

    CONSTRAINT "log_click_link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log_click_link" ADD CONSTRAINT "log_click_link_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
