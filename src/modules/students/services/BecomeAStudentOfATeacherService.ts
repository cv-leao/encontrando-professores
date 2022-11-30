import { StudentsOfATeacher } from "./../../../../node_modules/.prisma/client/index.d";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IIds {
  id_student: string;
  id_teacher: string;
}

class BecomeAStudentOfATeacherService {
  public async execute({
    id_student,
    id_teacher,
  }: IIds): Promise<StudentsOfATeacher> {
    const student = await prismaClient.students.findUnique({
      where: {
        id: id_student,
      },
    });

    if (!student) {
      throw new AppError("Aluno não encontrado.");
    }

    const teacher = await prismaClient.teachers.findUnique({
      where: {
        id: id_teacher,
      },
    });

    if (!teacher) {
      throw new AppError("Professor não encontrado.");
    }

    const studentsOfATeacher = await prismaClient.studentsOfATeacher.create({
      data: {
        id_students: id_student,
        id_teachers: id_teacher,
      },
    });

    return studentsOfATeacher;
  }
}

export default BecomeAStudentOfATeacherService;
