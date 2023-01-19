/*
  Warnings:

  - You are about to drop the column `feedCategoryId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `FeedCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_feedCategoryId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "feedCategoryId";

-- DropTable
DROP TABLE "FeedCategory";

-- CreateTable
CREATE TABLE "FeedCategoryList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedCategoryList_pkey" PRIMARY KEY ("id")
);
