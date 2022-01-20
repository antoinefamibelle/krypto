/*
  Warnings:

  - You are about to drop the column `user_pseudo` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_user_pseudo_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_pseudo",
ADD COLUMN     "user_username" TEXT,
ALTER COLUMN "user_first_name" DROP NOT NULL,
ALTER COLUMN "user_last_name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_user_username_key" ON "User"("user_username");
