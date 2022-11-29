/*
  Warnings:

  - A unique constraint covering the columns `[id_students_of_a_teacher]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_students_of_a_teacher` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "id_students_of_a_teacher" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teachers_id_students_of_a_teacher_key" ON "teachers"("id_students_of_a_teacher");

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_id_students_of_a_teacher_fkey" FOREIGN KEY ("id_students_of_a_teacher") REFERENCES "students_of_a_teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
