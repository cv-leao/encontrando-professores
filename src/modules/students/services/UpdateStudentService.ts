import { Students } from "./../../../../node_modules/.prisma/client/index.d";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IStudentToUpdate {
  id: string;
  name: string;
}

type IStudentUpdated = Omit<Students, "password">;

class UpdateStudentService {
  public async execute({
    id,
    name,
  }: IStudentToUpdate): Promise<IStudentUpdated> {
    if (name === "") {
      throw new AppError("Nome inválido.");
    }

    const studentExists = await prismaClient.students.findUnique({
      where: {
        id: id,
      },
    });

    if (!studentExists) {
      throw new AppError("Usuário não encontrado.");
    }

    const student = await prismaClient.students.update({
      select: {
        id: true,
        name: true,
        email: true,
      },
      data: {
        name: name,
      },
      where: {
        id: id,
      },
    });

    return student;
  }
}

export default UpdateStudentService;
