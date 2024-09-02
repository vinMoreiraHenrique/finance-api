-- AlterTable
ALTER TABLE "expense_categories" ADD COLUMN     "created_by" TEXT;

-- AddForeignKey
ALTER TABLE "expense_categories" ADD CONSTRAINT "expense_categories_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
