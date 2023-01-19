/*
  Warnings:

  - You are about to drop the `_FeedUploadToPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FeedUploadToPhoto" DROP CONSTRAINT "_FeedUploadToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeedUploadToPhoto" DROP CONSTRAINT "_FeedUploadToPhoto_B_fkey";

-- AlterTable
ALTER TABLE "FeedUpload" ADD COLUMN     "photoId" INTEGER;

-- DropTable
DROP TABLE "_FeedUploadToPhoto";

-- AddForeignKey
ALTER TABLE "FeedUpload" ADD CONSTRAINT "FeedUpload_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
