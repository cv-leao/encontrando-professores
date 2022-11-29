import { Teachers } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
interface ITeacherToShow {
  id: string;
}

type ShowTeacher = Omit<Teachers, "password">;

class ShowTeacherService {
  public async execute({ id }: ITeacherToShow): Promise<ShowTeacher> {
    const teacher = await prismaClient.teachers.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        matter: true,
      },
      where: {
        id: id,
      },
    });

    if (!teacher) {
      throw new AppError("Usuário não encontrado.");
    }

    return teacher;
  }
}

export default ShowTeacherService;
