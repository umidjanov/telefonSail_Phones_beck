/*
  Warnings:

  - The primary key for the `telefonlarTuri` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `telefonlarTuri` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "telefonlarTuri" DROP CONSTRAINT "telefonlarTuri_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "telefonlarTuri_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "telefonlarTuri_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "telefonlarTuri_id_key" ON "telefonlarTuri"("id");
