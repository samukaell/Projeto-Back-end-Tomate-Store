/*
  Warnings:

  - You are about to drop the column `userId` on the `session` table. All the data in the column will be lost.
  - Added the required column `email` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;
