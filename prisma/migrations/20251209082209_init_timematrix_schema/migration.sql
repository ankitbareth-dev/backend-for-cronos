/*
  Warnings:

  - You are about to drop the column `matrixId` on the `MatrixCell` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `TimeMatrix` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `TimeMatrix` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `TimeMatrix` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `TimeMatrix` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `TimeMatrix` table. All the data in the column will be lost.
  - Added the required column `matrixDataId` to the `MatrixCell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MatrixCell" DROP CONSTRAINT "MatrixCell_matrixId_fkey";

-- DropIndex
DROP INDEX "MatrixCell_matrixId_idx";

-- AlterTable
ALTER TABLE "MatrixCell" DROP COLUMN "matrixId",
ADD COLUMN     "matrixDataId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeMatrix" DROP COLUMN "endDate",
DROP COLUMN "endTime",
DROP COLUMN "interval",
DROP COLUMN "startDate",
DROP COLUMN "startTime";

-- CreateTable
CREATE TABLE "MatrixData" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matrixId" TEXT NOT NULL,

    CONSTRAINT "MatrixData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatrixData_matrixId_key" ON "MatrixData"("matrixId");

-- CreateIndex
CREATE INDEX "Category_matrixId_idx" ON "Category"("matrixId");

-- CreateIndex
CREATE INDEX "MatrixCell_matrixDataId_idx" ON "MatrixCell"("matrixDataId");

-- AddForeignKey
ALTER TABLE "MatrixData" ADD CONSTRAINT "MatrixData_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "TimeMatrix"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatrixCell" ADD CONSTRAINT "MatrixCell_matrixDataId_fkey" FOREIGN KEY ("matrixDataId") REFERENCES "MatrixData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
