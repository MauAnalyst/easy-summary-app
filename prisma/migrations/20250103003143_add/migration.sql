/*
  Warnings:

  - Added the required column `summary` to the `summarys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "summarys" ADD COLUMN     "summary" TEXT NOT NULL;
