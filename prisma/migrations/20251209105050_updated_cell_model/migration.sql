/*
  Warnings:

  - A unique constraint covering the columns `[matrixDataId,index,userId]` on the table `MatrixCell` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `MatrixCell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatrixCell" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MatrixCell_matrixDataId_index_userId_key" ON "MatrixCell"("matrixDataId", "index", "userId");

-- AddForeignKey
ALTER TABLE "MatrixCell" ADD CONSTRAINT "MatrixCell_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
