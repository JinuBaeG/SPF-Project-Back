/*
  Warnings:

  - You are about to drop the column `groupId` on the `GroupInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupInfo" DROP CONSTRAINT "GroupInfo_groupId_fkey";

-- AlterTable
ALTER TABLE "GroupInfo" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "_GroupToGroupInfo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToGroupInfo_AB_unique" ON "_GroupToGroupInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToGroupInfo_B_index" ON "_GroupToGroupInfo"("B");

-- AddForeignKey
ALTER TABLE "_GroupToGroupInfo" ADD CONSTRAINT "_GroupToGroupInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToGroupInfo" ADD CONSTRAINT "_GroupToGroupInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "GroupInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
