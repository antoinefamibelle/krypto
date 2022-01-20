-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_first_name" TEXT NOT NULL,
    "user_last_name" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_phone" TEXT,
    "user_pseudo" TEXT,
    "user_is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_pseudo_key" ON "User"("user_pseudo");
