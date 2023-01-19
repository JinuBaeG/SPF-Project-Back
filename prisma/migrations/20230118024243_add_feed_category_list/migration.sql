-- CreateTable
CREATE TABLE "_FeedCategoryListToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TutorToTutorInfo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TutorToTutorTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedCategoryListToPhoto_AB_unique" ON "_FeedCategoryListToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedCategoryListToPhoto_B_index" ON "_FeedCategoryListToPhoto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TutorToTutorInfo_AB_unique" ON "_TutorToTutorInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorToTutorInfo_B_index" ON "_TutorToTutorInfo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TutorToTutorTag_AB_unique" ON "_TutorToTutorTag"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorToTutorTag_B_index" ON "_TutorToTutorTag"("B");

-- AddForeignKey
ALTER TABLE "_FeedCategoryListToPhoto" ADD CONSTRAINT "_FeedCategoryListToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "FeedCategoryList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedCategoryListToPhoto" ADD CONSTRAINT "_FeedCategoryListToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorToTutorInfo" ADD CONSTRAINT "_TutorToTutorInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorToTutorInfo" ADD CONSTRAINT "_TutorToTutorInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "TutorInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorToTutorTag" ADD CONSTRAINT "_TutorToTutorTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorToTutorTag" ADD CONSTRAINT "_TutorToTutorTag_B_fkey" FOREIGN KEY ("B") REFERENCES "TutorTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
