/*
  Warnings:

  - You are about to drop the column `salesRep` on the `Credit` table. All the data in the column will be lost.
  - Added the required column `salesRepId` to the `Credit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Credit" DROP COLUMN "salesRep",
ADD COLUMN     "salesRepId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Credit" ADD CONSTRAINT "Credit_salesRepId_fkey" FOREIGN KEY ("salesRepId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
