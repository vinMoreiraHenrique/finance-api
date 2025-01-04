/*
  Warnings:

  - The primary key for the `expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `expenses` table. All the data in the column will be lost.
  - The required column `uuid` was added to the `expenses` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "expense_categories" ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_pkey",
DROP COLUMN "id",
ADD COLUMN     "updated_by" TEXT,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("uuid");

-- CreateTable
CREATE TABLE "recurring_expenses" (
    "uuid" TEXT NOT NULL,
    "expense_uuid" TEXT NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "recurring_expenses_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "expense_categories" ADD CONSTRAINT "expense_categories_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_expenses" ADD CONSTRAINT "recurring_expenses_expense_uuid_fkey" FOREIGN KEY ("expense_uuid") REFERENCES "expenses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_expenses" ADD CONSTRAINT "recurring_expenses_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_expenses" ADD CONSTRAINT "recurring_expenses_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
