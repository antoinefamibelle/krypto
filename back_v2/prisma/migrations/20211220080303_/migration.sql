-- CreateTable
CREATE TABLE "Krypto" (
    "id" TEXT NOT NULL,
    "krypto_name" TEXT NOT NULL,
    "krypto_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "krypto_average_price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Krypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "purchase_date" TEXT NOT NULL,
    "purchase_price" DOUBLE PRECISION NOT NULL,
    "purchase_amount" DOUBLE PRECISION NOT NULL,
    "krypto_id" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_krypto_id_fkey" FOREIGN KEY ("krypto_id") REFERENCES "Krypto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
