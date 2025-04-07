-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_access" (
    "id" UUID NOT NULL,
    "password" TEXT NOT NULL,
    "user_admin" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_user" UUID NOT NULL,

    CONSTRAINT "user_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_user" (
    "id" UUID NOT NULL,
    "group_name" TEXT NOT NULL,
    "status_group" BOOLEAN NOT NULL DEFAULT true,
    "img_icon_group" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" UUID NOT NULL,

    CONSTRAINT "group_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "view_status" BOOLEAN NOT NULL,
    "position_link" INTEGER NOT NULL,
    "preview_before_click" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_user" UUID NOT NULL,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_page_view" (
    "id" UUID NOT NULL,
    "ip_address" TEXT NOT NULL,
    "page_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_page_view_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_access" ADD CONSTRAINT "user_access_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_user" ADD CONSTRAINT "group_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
