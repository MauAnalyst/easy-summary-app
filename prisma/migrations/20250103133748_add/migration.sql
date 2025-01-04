/*
  Warnings:

  - You are about to drop the column `summary` on the `summarys` table. All the data in the column will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `textarea` to the `summarys` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_summaryID_fkey";

-- AlterTable
ALTER TABLE "summarys" DROP COLUMN "summary",
ADD COLUMN     "textarea" TEXT NOT NULL;

-- DropTable
DROP TABLE "Questions";

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "alternatives" TEXT[],
    "summaryID" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_summaryID_fkey" FOREIGN KEY ("summaryID") REFERENCES "summarys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
