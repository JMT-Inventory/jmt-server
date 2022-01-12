-- AlterTable
ALTER TABLE "products" ADD COLUMN     "storageId" TEXT;

-- CreateTable
CREATE TABLE "storages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "storages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
