/*
  Warnings:

  - The primary key for the `expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_uuid` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `expenses` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `expenses` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_category_uuid_fkey";

-- AlterTable
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_pkey",
DROP COLUMN "category_uuid",
DROP COLUMN "date",
DROP COLUMN "uuid",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "expense_categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
