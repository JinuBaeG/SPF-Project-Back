/*
  Warnings:

  - You are about to drop the column `file` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "file";

-- CreateTable
CREATE TABLE "FeedUpload" (
    "id" SERIAL NOT NULL,
    "photoId" INTEGER,
    "imagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedUpload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedUpload" ADD CONSTRAINT "FeedUpload_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
