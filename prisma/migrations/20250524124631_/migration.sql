/*
  Warnings:

  - You are about to drop the column `telefon_turlariId` on the `telefonlar` table. All the data in the column will be lost.
  - You are about to drop the `telefonlarTuri` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `telefonlarTuriId` to the `telefonlar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "telefonlar" DROP CONSTRAINT "telefonlar_telefon_turlariId_fkey";

-- AlterTable
ALTER TABLE "telefonlar" DROP COLUMN "telefon_turlariId",
ADD COLUMN     "telefonlarTuriId" TEXT NOT NULL;

-- DropTable
DROP TABLE "telefonlarTuri";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "telefonlar" ADD CONSTRAINT "telefonlar_telefonlarTuriId_fkey" FOREIGN KEY ("telefonlarTuriId") REFERENCES "telefon_turlari"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
