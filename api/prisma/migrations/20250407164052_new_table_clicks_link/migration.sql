-- CreateTable
CREATE TABLE "ClicksLink" (
    "id" UUID NOT NULL,
    "address_ip" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_link" UUID NOT NULL,

    CONSTRAINT "ClicksLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClicksLink" ADD CONSTRAINT "ClicksLink_id_link_fkey" FOREIGN KEY ("id_link") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
