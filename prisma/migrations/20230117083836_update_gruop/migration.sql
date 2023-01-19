/*
  Warnings:

  - You are about to drop the column `sportEvent` on the `Group` table. All the data in the column will be lost.
  - Added the required column `sportsEvent` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "sportEvent",
ADD COLUMN     "sportsEvent" TEXT NOT NULL;
