/*
  Warnings:

  - Added the required column `feedCategoryId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "feedCategoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FeedCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_feedCategoryId_fkey" FOREIGN KEY ("feedCategoryId") REFERENCES "FeedCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
