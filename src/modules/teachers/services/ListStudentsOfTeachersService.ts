import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
import { Students } from "./../../../../node_modules/.prisma/client/index.d";

interface ITeacher {
  id: string;
}

type StudentsToList = Omit<Students, "password">;

class ListStudentsOfTeachersService {
  public async execute({ id }: ITeacher): Promise<StudentsToList> {
    const teacher = await prismaClient.teachers.findUnique({
      where: {
        id: id,
      },
    });

    if (!teacher) {
      throw new AppError("ID incorreto, este professor não existe.");
    }

    const students = await prismaClient.studentsOfATeacher.findMany({
      select: {
        Students: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      where: {
        id_teachers: id,
      },
    });

    return students;
  }
}

export default ListStudentsOfTeachersService;
