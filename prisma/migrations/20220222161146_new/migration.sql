/*
  Warnings:

  - A unique constraint covering the columns `[lawyerId]` on the table `LawyerBank` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lawyer_name_key";

-- DropIndex
DROP INDEX "User_name_key";

-- CreateTable
CREATE TABLE "ReviewPayout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "amountInPaisa" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReviewPayout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewPayout_reviewId_key" ON "ReviewPayout"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "LawyerBank_lawyerId_key" ON "LawyerBank"("lawyerId");

-- AddForeignKey
ALTER TABLE "ReviewPayout" ADD CONSTRAINT "ReviewPayout_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
