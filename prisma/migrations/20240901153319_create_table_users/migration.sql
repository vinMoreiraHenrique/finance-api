/*
  Warnings:

  - You are about to drop the column `categoryuuid` on the `expenses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `expense_categories` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `expense_categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `category_uuid` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_categoryuuid_fkey";

-- AlterTable
ALTER TABLE "expense_categories" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "categoryuuid",
ADD COLUMN     "category_uuid" TEXT NOT NULL,
ADD COLUMN     "user_uuid" TEXT;

-- DropEnum
DROP TYPE "ExpenseCategoryName";

-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "expense_categories_name_key" ON "expense_categories"("name");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "expense_categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
