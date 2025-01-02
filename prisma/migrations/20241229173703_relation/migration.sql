/*
  Warnings:

  - Added the required column `userID` to the `summarys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "summarys" ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "summarys" ADD CONSTRAINT "summarys_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
