/*
  Warnings:

  - You are about to drop the column `categoryId` on the `MatrixCell` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `MatrixCell` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `MatrixCell` table. All the data in the column will be lost.
  - Added the required column `index` to the `MatrixCell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MatrixCell" DROP CONSTRAINT "MatrixCell_categoryId_fkey";

-- DropIndex
DROP INDEX "MatrixCell_categoryId_idx";

-- AlterTable
ALTER TABLE "MatrixCell" DROP COLUMN "categoryId",
DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "colorHex" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "index" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "MatrixCell_index_idx" ON "MatrixCell"("index");
