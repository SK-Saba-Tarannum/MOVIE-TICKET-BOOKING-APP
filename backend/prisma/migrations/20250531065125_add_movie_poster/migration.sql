/*
  Warnings:

  - Added the required column `poster` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "poster" TEXT NOT NULL;
