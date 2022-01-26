/*
  Warnings:

  - You are about to drop the column `lawyerId` on the `GoogleOAuth` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedByAdminId` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Offering` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Lawyer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `GoogleOAuth` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Lawyer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GoogleOAuth" DROP CONSTRAINT "GoogleOAuth_lawyerId_fkey";

-- DropForeignKey
ALTER TABLE "GoogleOAuth" DROP CONSTRAINT "GoogleOAuth_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lawyer" DROP CONSTRAINT "Lawyer_verifiedByAdminId_fkey";

-- DropIndex
DROP INDEX "GoogleOAuth_lawyerId_key";

-- AlterTable
ALTER TABLE "GoogleOAuth" DROP COLUMN "lawyerId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lawyer" DROP COLUMN "isActive",
DROP COLUMN "verifiedByAdminId",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Offering" DROP COLUMN "isActive",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isLawyer" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Lawyer_userId_key" ON "Lawyer"("userId");

-- AddForeignKey
ALTER TABLE "GoogleOAuth" ADD CONSTRAINT "GoogleOAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
