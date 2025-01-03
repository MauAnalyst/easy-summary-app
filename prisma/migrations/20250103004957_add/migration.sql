/*
  Warnings:

  - You are about to drop the column `alternatives` on the `summarys` table. All the data in the column will be lost.
  - You are about to drop the column `questions` on the `summarys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "summarys" DROP COLUMN "alternatives",
DROP COLUMN "questions";

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "alternatives" TEXT[],
    "summaryID" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_summaryID_fkey" FOREIGN KEY ("summaryID") REFERENCES "summarys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
