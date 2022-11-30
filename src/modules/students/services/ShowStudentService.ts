import { Students } from "./../../../../node_modules/.prisma/client/index.d";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface ITeacherToShow {
  id: string;
}

type ShowStudent = Omit<Students, "password">;

class ShowStudentService {
  public async execute({ id }: ITeacherToShow): Promise<ShowStudent> {
    const student = await prismaClient.students.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        id: id,
      },
    });

    if (!student) {
      throw new AppError("Usuário não encontrado.");
    }

    return student;
  }
}

export default ShowStudentService;
