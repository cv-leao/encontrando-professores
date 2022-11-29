import { Teachers } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IteacherToUpdate {
  id: string;
  name: string;
}

type ITeacherUpdated = Omit<Teachers, "password">;

class UpdateTeacherService {
  public async execute({
    id,
    name,
  }: IteacherToUpdate): Promise<ITeacherUpdated> {
    const teacherExists = await prismaClient.teachers.findUnique({
      where: {
        id: id,
      },
    });

    if (!teacherExists) {
      throw new AppError("Usuário não encontrado.");
    }

    const teacher = await prismaClient.teachers.update({
      select: {
        id: true,
        name: true,
        email: true,
        matter: true,
      },
      data: {
        name: name,
      },
      where: {
        id: id,
      },
    });

    return teacher;
  }
}

export default UpdateTeacherService;
