/*
  Warnings:

  - Added the required column `discription` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "discription" TEXT NOT NULL;
