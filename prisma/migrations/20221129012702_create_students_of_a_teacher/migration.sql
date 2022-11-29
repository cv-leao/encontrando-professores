/*
  Warnings:

  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Students";

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students_of_a_teacher" (
    "id" TEXT NOT NULL,
    "id_students" TEXT NOT NULL,

    CONSTRAINT "students_of_a_teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_id_key" ON "students"("id");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_of_a_teacher_id_key" ON "students_of_a_teacher"("id");

-- AddForeignKey
ALTER TABLE "students_of_a_teacher" ADD CONSTRAINT "students_of_a_teacher_id_students_fkey" FOREIGN KEY ("id_students") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
