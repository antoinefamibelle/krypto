/*
  Warnings:

  - Added the required column `krypto_updated_at` to the `Krypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_updated_at` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Krypto" ADD COLUMN     "krypto_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "krypto_updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "purchase_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "purchase_updated_at" TIMESTAMP(3) NOT NULL;
