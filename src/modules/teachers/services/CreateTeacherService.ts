import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
import { Teachers } from "./../../../../node_modules/.prisma/client/index.d";
import { hash } from "bcryptjs";

interface ITeacherToCreate {
  name: string;
  email: string;
  password: string;
  samePasswords: string;
  matter: string;
}

type ITeacherCreated = Omit<Teachers, "password">;

class CreateTeacherService {
  public async execute({
    name,
    email,
    password,
    samePasswords,
    matter,
  }: ITeacherToCreate): Promise<ITeacherCreated> {
    /*********Conferindo se o email inserido pelo usuário está "padronizado"*********/
    const standardizedEmail = /\S+@\S+\.\S+/;

    if (!standardizedEmail.test(email)) {
      throw new AppError("Endereço de e-mail inválido.");
    }
    /********************************************************************************/

    if (name === "") {
      throw new AppError("Nome inválido.");
    }

    if (matter === "") {
      throw new AppError("Matéria inválida.");
    }

    const emailExists = await prismaClient.teachers.findUnique({
      where: {
        email: email,
      },
    });

    const emailToIf = !!emailExists;

    if (emailToIf) {
      throw new AppError("Email já utilizado.");
    }

    /*********Conferindo a confirmação de senha do usuário na hora do cadastro*********/
    if (!(password.length >= 6)) {
      throw new AppError("A senha deve conter no mínimo 6 caracteres.");
    }

    if (!(password === samePasswords)) {
      throw new AppError("As senhas devem ser iguais.");
    }
    /**********************************************************************************/

    const hashedPassword = await hash(password, 8);

    const teacher = await prismaClient.teachers.create({
      select: {
        id: true,
        name: true,
        email: true,
        matter: true,
      },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        matter: matter,
      },
    });

    return teacher;
  }
}

export default CreateTeacherService;
