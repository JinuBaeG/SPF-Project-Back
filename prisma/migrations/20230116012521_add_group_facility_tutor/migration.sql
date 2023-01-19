-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "activeArea" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addrRoad" TEXT NOT NULL,
    "addAddr" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "areaLatitude" TEXT NOT NULL,
    "areaLongitude" TEXT NOT NULL,
    "sportEvent" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "maxMember" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupPresidentId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPresident" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupPresident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupInfo" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER,
    "discription" TEXT NOT NULL,
    "awardDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isUse" BOOLEAN NOT NULL,
    "isCustom" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "activeArea" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addrRoad" TEXT NOT NULL,
    "addAddr" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "areaLatitude" TEXT NOT NULL,
    "areaLongitude" TEXT NOT NULL,
    "operTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacilityInfo" (
    "id" SERIAL NOT NULL,
    "facilityId" INTEGER,
    "discription" TEXT NOT NULL,
    "awardDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacilityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacilityTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "isUse" BOOLEAN NOT NULL,
    "isCustom" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacilityTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacilitySports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacilitySports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "activeArea" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addrRoad" TEXT NOT NULL,
    "addAddr" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "areaLatitude" TEXT NOT NULL,
    "areaLongitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorInfo" (
    "id" SERIAL NOT NULL,
    "discription" TEXT NOT NULL,
    "awardDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "isUse" BOOLEAN NOT NULL,
    "isCustom" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportEvent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToTutor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToGroupTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FacilityToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FacilityToTutor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FacilityToFacilitySports" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FacilityToFacilityTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_name_key" ON "Facility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_name_key" ON "Tutor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToTutor_AB_unique" ON "_GroupToTutor"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToTutor_B_index" ON "_GroupToTutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToGroupTag_AB_unique" ON "_GroupToGroupTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToGroupTag_B_index" ON "_GroupToGroupTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToGroup_AB_unique" ON "_FacilityToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToGroup_B_index" ON "_FacilityToGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToTutor_AB_unique" ON "_FacilityToTutor"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToTutor_B_index" ON "_FacilityToTutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToFacilitySports_AB_unique" ON "_FacilityToFacilitySports"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToFacilitySports_B_index" ON "_FacilityToFacilitySports"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToFacilityTag_AB_unique" ON "_FacilityToFacilityTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToFacilityTag_B_index" ON "_FacilityToFacilityTag"("B");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_groupPresidentId_fkey" FOREIGN KEY ("groupPresidentId") REFERENCES "GroupPresident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPresident" ADD CONSTRAINT "GroupPresident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupInfo" ADD CONSTRAINT "GroupInfo_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityInfo" ADD CONSTRAINT "FacilityInfo_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTutor" ADD CONSTRAINT "_GroupToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTutor" ADD CONSTRAINT "_GroupToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToGroupTag" ADD CONSTRAINT "_GroupToGroupTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToGroupTag" ADD CONSTRAINT "_GroupToGroupTag_B_fkey" FOREIGN KEY ("B") REFERENCES "GroupTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToGroup" ADD CONSTRAINT "_FacilityToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToGroup" ADD CONSTRAINT "_FacilityToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToTutor" ADD CONSTRAINT "_FacilityToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToTutor" ADD CONSTRAINT "_FacilityToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToFacilitySports" ADD CONSTRAINT "_FacilityToFacilitySports_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToFacilitySports" ADD CONSTRAINT "_FacilityToFacilitySports_B_fkey" FOREIGN KEY ("B") REFERENCES "FacilitySports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToFacilityTag" ADD CONSTRAINT "_FacilityToFacilityTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToFacilityTag" ADD CONSTRAINT "_FacilityToFacilityTag_B_fkey" FOREIGN KEY ("B") REFERENCES "FacilityTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
