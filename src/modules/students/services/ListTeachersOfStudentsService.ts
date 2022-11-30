import { Teachers } from "./../../../../node_modules/.prisma/client/index.d";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IStudent {
  id: string;
}

type TeachersToList = Omit<Teachers, "password">;

class ListTeachersOfStudentsService {
  public async execute({ id }: IStudent): Promise<TeachersToList> {
    const student = await prismaClient.teachers.findUnique({
      where: {
        id: id,
      },
    });

    if (!student) {
      throw new AppError("ID incorreto, este usuário não existe.");
    }

    const teachers = await prismaClient.studentsOfATeacher.findMany({
      select: {
        Teachers: {
          select: {
            id: true,
            name: true,
            email: true,
            matter: true,
          },
        },
      },
      where: {
        id_students: id,
      },
    });

    return teachers;
  }
}

export default ListTeachersOfStudentsService;
