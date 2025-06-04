/*
  Warnings:

  - You are about to drop the column `addedById` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `addedOn` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `theatreId` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `Show` table. All the data in the column will be lost.
  - Added the required column `theatreName` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_addedById_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_theatreId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_userId_fkey";

-- DropForeignKey
ALTER TABLE "Show" DROP CONSTRAINT "Show_managerId_fkey";

-- DropIndex
DROP INDEX "Manager_userId_key";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "addedById",
DROP COLUMN "addedOn",
DROP COLUMN "theatreId",
DROP COLUMN "userId",
ADD COLUMN     "theatreName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "managerId";
