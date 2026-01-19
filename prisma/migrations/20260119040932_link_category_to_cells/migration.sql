-- AlterTable
ALTER TABLE "MatrixCell" ADD COLUMN     "categoryId" TEXT;

-- CreateIndex
CREATE INDEX "MatrixCell_categoryId_idx" ON "MatrixCell"("categoryId");

-- AddForeignKey
ALTER TABLE "MatrixCell" ADD CONSTRAINT "MatrixCell_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
