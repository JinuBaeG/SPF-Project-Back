/*
  Warnings:

  - You are about to drop the column `discription` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `reportDiscription` on the `BugReport` table. All the data in the column will be lost.
  - You are about to drop the column `contestDiscription` on the `Contest` table. All the data in the column will be lost.
  - You are about to drop the column `noticeDiscription` on the `ContestNotice` table. All the data in the column will be lost.
  - You are about to drop the column `reportDiscription` on the `ContestReport` table. All the data in the column will be lost.
  - You are about to drop the column `reportDiscription` on the `Report` table. All the data in the column will be lost.
  - Added the required column `reportDescription` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportDescription` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "BugReport" DROP COLUMN "reportDiscription",
ADD COLUMN     "reportDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "contestDiscription",
ADD COLUMN     "contestDescription" TEXT;

-- AlterTable
ALTER TABLE "ContestNotice" DROP COLUMN "noticeDiscription",
ADD COLUMN     "noticeDescription" TEXT;

-- AlterTable
ALTER TABLE "ContestReport" DROP COLUMN "reportDiscription",
ADD COLUMN     "reportDescription" TEXT;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reportDiscription",
ADD COLUMN     "reportDescription" TEXT NOT NULL;
