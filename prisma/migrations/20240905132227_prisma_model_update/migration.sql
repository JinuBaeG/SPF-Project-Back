/*
  Warnings:

  - You are about to drop the column `discription` on the `AdminFaq` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `AdminNotice` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `FacilityInfo` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Gallery` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `GroupInfo` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `RequestAddFacility` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `RequestAddTutor` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `TutorInfo` table. All the data in the column will be lost.
  - You are about to drop the column `inquiryDiscription` on the `TutorInquiry` table. All the data in the column will be lost.
  - You are about to drop the column `responseDiscription` on the `TutorInquiryComment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description,awardDate]` on the table `FacilityInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description,awardDate]` on the table `GroupInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description,awardDate]` on the table `TutorInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `AdminFaq` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `AdminNotice` table without a default value. This is not possible if the table is not empty.
  - Made the column `blockedById` on table `BlockUser` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `FacilityInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `maxMember` on the `Group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `description` to the `GroupInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `RequestAddFacility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `RequestAddTutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `TutorInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inquiryDescription` to the `TutorInquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseDescription` to the `TutorInquiryComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BlockUser_blockedById_key";

-- DropIndex
DROP INDEX "FacilityInfo_discription_awardDate_key";

-- DropIndex
DROP INDEX "GroupInfo_discription_awardDate_key";

-- DropIndex
DROP INDEX "TutorInfo_discription_awardDate_key";

-- AlterTable
ALTER TABLE "AdminFaq" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AdminNotice" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BlockUser" ALTER COLUMN "blockedById" SET NOT NULL;

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BoardLike" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Facility" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FacilityInfo" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT,
DROP COLUMN "maxMember",
ADD COLUMN     "maxMember" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GroupInfo" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReComment" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RequestAddFacility" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RequestAddTutor" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "TutorInfo" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorInquiry" DROP COLUMN "inquiryDiscription",
ADD COLUMN     "inquiryDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorInquiryComment" DROP COLUMN "responseDiscription",
ADD COLUMN     "responseDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_UserFollowing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollowing_AB_unique" ON "_UserFollowing"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollowing_B_index" ON "_UserFollowing"("B");

-- CreateIndex
CREATE INDEX "idx_contestCourt_contestId" ON "ContestCourt"("contestId");

-- CreateIndex
CREATE INDEX "idx_contest_group_match_history_contestId" ON "ContestGroupMatchHistory"("contestId");

-- CreateIndex
CREATE INDEX "idx_contest_group_match_groupId" ON "ContestGroupMatchHistory"("contestMatchGroupId");

-- CreateIndex
CREATE INDEX "idx_contest_match_group_contestId" ON "ContestMatchGroup"("contestId");

-- CreateIndex
CREATE INDEX "idx_contest_match_group_tier_groupId" ON "ContestMatchGroup"("contestTierGroupId");

-- CreateIndex
CREATE INDEX "idx_contest_notice_contestId" ON "ContestNotice"("contestId");

-- CreateIndex
CREATE INDEX "idx_contest_report_contestId" ON "ContestReport"("contestId");

-- CreateIndex
CREATE INDEX "idx_contestTierGroup_contestId" ON "ContestTierGroup"("contestId");

-- CreateIndex
CREATE INDEX "idx_contest_tournament_group_contestId" ON "ContestTournamentGroup"("contestId");

-- CreateIndex
CREATE INDEX "idx_contest_tournament_group_tierGroupId" ON "ContestTournamentGroup"("contestTierGroupId");

-- CreateIndex
CREATE INDEX "idx_contest_tournament_history_contestId" ON "ContestTournamentHistory"("contestId");

-- CreateIndex
CREATE INDEX "idx_contest_tournament_group_groupId" ON "ContestTournamentHistory"("contestTournamentGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "FacilityInfo_description_awardDate_key" ON "FacilityInfo"("description", "awardDate");

-- CreateIndex
CREATE UNIQUE INDEX "GroupInfo_description_awardDate_key" ON "GroupInfo"("description", "awardDate");

-- CreateIndex
CREATE UNIQUE INDEX "TutorInfo_description_awardDate_key" ON "TutorInfo"("description", "awardDate");

-- AddForeignKey
ALTER TABLE "_UserFollowing" ADD CONSTRAINT "_UserFollowing_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowing" ADD CONSTRAINT "_UserFollowing_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
