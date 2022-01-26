/*
  Warnings:

  - The values [INTIAL] on the enum `ReviewStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReviewStatus_new" AS ENUM ('INITIAL', 'WAITING_FOR_PAYMENT', 'PENDING_FOR_REVIEW', 'IN_REVIEW', 'CLOSED');
ALTER TABLE "Review" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Review" ALTER COLUMN "status" TYPE "ReviewStatus_new" USING ("status"::text::"ReviewStatus_new");
ALTER TYPE "ReviewStatus" RENAME TO "ReviewStatus_old";
ALTER TYPE "ReviewStatus_new" RENAME TO "ReviewStatus";
DROP TYPE "ReviewStatus_old";
ALTER TABLE "Review" ALTER COLUMN "status" SET DEFAULT 'INITIAL';
COMMIT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "status" SET DEFAULT E'INITIAL';
