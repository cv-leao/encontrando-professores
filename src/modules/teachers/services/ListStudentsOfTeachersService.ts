import { StudentsOfATeacher, Teachers } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
import { Students } from "./../../../../node_modules/.prisma/client/index.d";

interface ITeacher {
  id: string;
}

type StudentsToList = Omit<Students, "password">;

class ListStudentsOfTeachersService {
  public async execute({ id }: ITeacher): Promise<any> {
    const students = await prismaClient.studentsOfATeacher.findUnique({
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
