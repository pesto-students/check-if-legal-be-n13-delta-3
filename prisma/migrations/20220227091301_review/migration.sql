-- CreateTable
CREATE TABLE "ReviewDocument" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "documentName" VARCHAR(100) NOT NULL,

    CONSTRAINT "ReviewDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReviewDocument" ADD CONSTRAINT "ReviewDocument_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
