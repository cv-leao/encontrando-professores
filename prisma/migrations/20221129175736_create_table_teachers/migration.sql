/*
  Warnings:

  - You are about to drop the column `id_students_of_a_teacher` on the `teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_teachers]` on the table `students_of_a_teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_teachers` to the `students_of_a_teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_id_students_of_a_teacher_fkey";

-- DropIndex
DROP INDEX "teachers_id_students_of_a_teacher_key";

-- AlterTable
ALTER TABLE "students_of_a_teacher" ADD COLUMN     "id_teachers" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "id_students_of_a_teacher";

-- CreateIndex
CREATE UNIQUE INDEX "students_of_a_teacher_id_teachers_key" ON "students_of_a_teacher"("id_teachers");

-- AddForeignKey
ALTER TABLE "students_of_a_teacher" ADD CONSTRAINT "students_of_a_teacher_id_teachers_fkey" FOREIGN KEY ("id_teachers") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
