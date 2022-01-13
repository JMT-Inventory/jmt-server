-- CreateTable
CREATE TABLE "product_exits" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_exits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_exits" ADD CONSTRAINT "product_exits_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
