/*
  Warnings:

  - You are about to drop the column `facilityId` on the `FacilityInfo` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Group` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `GroupTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FacilityInfo" DROP CONSTRAINT "FacilityInfo_facilityId_fkey";

-- AlterTable
ALTER TABLE "FacilityInfo" DROP COLUMN "facilityId";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "photoUrl",
ADD COLUMN     "imagePath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GroupTag" ADD COLUMN     "imagePath" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_FacilityToFacilityInfo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToFacilityInfo_AB_unique" ON "_FacilityToFacilityInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToFacilityInfo_B_index" ON "_FacilityToFacilityInfo"("B");

-- AddForeignKey
ALTER TABLE "_FacilityToFacilityInfo" ADD CONSTRAINT "_FacilityToFacilityInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToFacilityInfo" ADD CONSTRAINT "_FacilityToFacilityInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "FacilityInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
