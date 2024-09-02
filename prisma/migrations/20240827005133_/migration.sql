-- CreateEnum
CREATE TYPE "ExpenseCategoryName" AS ENUM ('SUPERFLUOUS', 'RENT', 'FOOD', 'TRANSPORTATION', 'ENTERTAINMENT', 'OTHER');

-- CreateTable
CREATE TABLE "expense_categories" (
    "uuid" TEXT NOT NULL,
    "name" "ExpenseCategoryName" NOT NULL DEFAULT 'OTHER',
    "description" TEXT NOT NULL,

    CONSTRAINT "expense_categories_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "expenses" (
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "amount" DOUBLE PRECISION NOT NULL,
    "categoryuuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_categoryuuid_fkey" FOREIGN KEY ("categoryuuid") REFERENCES "expense_categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
