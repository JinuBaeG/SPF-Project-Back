/*
  Warnings:

  - You are about to drop the column `photoId` on the `FeedUpload` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imagePath]` on the table `FeedUpload` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FeedUpload" DROP CONSTRAINT "FeedUpload_photoId_fkey";

-- AlterTable
ALTER TABLE "FeedUpload" DROP COLUMN "photoId";

-- CreateTable
CREATE TABLE "_FeedUploadToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedUploadToPhoto_AB_unique" ON "_FeedUploadToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedUploadToPhoto_B_index" ON "_FeedUploadToPhoto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "FeedUpload_imagePath_key" ON "FeedUpload"("imagePath");

-- AddForeignKey
ALTER TABLE "_FeedUploadToPhoto" ADD CONSTRAINT "_FeedUploadToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "FeedUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedUploadToPhoto" ADD CONSTRAINT "_FeedUploadToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
