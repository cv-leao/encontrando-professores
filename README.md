# API - Encontrando Professores

Este projeto é referente ao desafio da segunda etapa para programa de estágio da MB Labs

## Descrição:

Sistema que possibilita alunos de encontrarem professores de qualquer matéria(desde que tenha algum professor que ministre aula da matéria) e se tornar aluno do professor que quiser.

## Tecnologias e Ferramentas utilizadas:

[Node.js](https://nodejs.org/en/) - [TypeScript](https://www.typescriptlang.org/) - [Prisma](https://www.prisma.io/) - [Postgres](https://www.postgresql.org/) - [Docker](https://www.docker.com/) - [Visual Studio Code](https://code.visualstudio.com/) - [Insomnia](https://insomnia.rest/) - [pgAdmin 4](https://www.pgadmin.org/)

Obs: O Docker foi utilizado localmenta para as dependências do Postgres

### Criando uma imagem Docker para utilizar as dependências do Postgres:

    docker run --name NomeDaImagemASerCriada -e POSTGRES_PASSWORD=docker -p 5555:5432 -d postgre

## Tabelas e Atributos:

### teachers

    id
    name
    email
    password
    matter

### students

    id
    name
    email
    password

### students_of_a_teacher

    id
    id_students
    id_teachers

## Histórias de Usuário:

### Professor:

    01 - Como professor, eu quero criar uma conta                                              - Feito
    02 - Como professor, eu quero fazer login em minha conta                                   - Feito
    03 - Como professor, eu quero editar minhas informações                                    - Feito
    04 - Como professor, eu quero recuperar minhas informações pessoais para ver no meu perfil - Feito
    05 - Como professor, eu quero listar todos os meus alunos                                  - Feito

### Aluno:

    01 - Como aluno, eu quero criar uma conta                                              - Feito
    02 - Como aluno, eu quero fazer login em minha conta                                   - Feito
    03 - Como aluno, eu quero me tornar aluno de algum professor                           - Feito
    04 - Como aluno, eu quero editar minhas informações                                    - Feito
    05 - Como aluno, eu quero recuperar minhas informações pessoais para ver no meu perfil - A Fazer
    06 - Como aluno, eu quero listar todos os meus professores                             - A Fazer

## Utilização da API:

Crie um arquivo .env com base nas configurações que estão no arquivo .env.example

### Criar Professor:

    Método HTTP: POST

    Rota: /teachers/create

    Entrada(json):
    {
        "name": "Exemplo Nome",
        "email": "exemplo@gmail.com",
        "password": "123456",
        "samePasswords": "123456",
        "matter": "Nome da matéria"
    }

    Saída(json):
    {
        "id": "6c1a2035-4dcf-4b8d-b816-7c448be1b647",
        "name": "Exemplo Nome",
        "email": "exemplo@gmail.com",
        "matter": "Nome da matéria"
    }

Obs: samePassword é a confirmação da senha.

### Fazer login(professor):

    Método HTTP: POST

    Rota: /teachers/session

    Entrada(json):
    {
        "email": "exemplo@gmail.com",
        "password": "123456"
    }

    Saída(json):
    {
        "id": "6c1a2035-4dcf-4b8d-b816-7c448be1b647",
        "name": "Exemplo Nome",
        "email": "exemplo@gmail.com",
        "matter": "Nome da matéria"
    }

### Atualizar informações do Professor:

    Método HTTP: PUT

    Rota: /teachers/update

    Entrada(json):
    {
        "name": "Carlos Victor"
    }

    Saída(json):
    {
        "id": "6c1a2035-4dcf-4b8d-b816-7c448be1b647",
        "name": "Carlos Victor",
        "email": "exemplo@gmail.com",
        "matter": "Nome da matéria"
    }

Obs: Somente o nome do professor pode ser modificado.

### Pegar as informações pessoais(professor):

    Método HTTP: GET

    Rota: /teachers/show

    Sem entrada.

    Saída(json):
    {
        "id": "6c1a2035-4dcf-4b8d-b816-7c448be1b647",
        "name": "Carlos Victor",
        "email": "exemplo@gmail.com",
        "matter": "Nome da matéria"
    }

### Listar todos os alunos de um único professor:

    Método HTTP: GET

    Rota: /teachers/list/students

    Sem entrada.

    Saída(json):
    [
        {
            "Students": {
                "id": "...",
                "name": "...",
                "email": "..."
            }
        },
        {
            "Students": {
                "id": "...",
                "name": "...",
                "email": "..."
            }
        }
    ]

##

##

##

### Criar Aluno:

    Método HTTP: POST

    Rota: /students/create

    Entrada(json):
    {
        "name": "Exemplo Nome",
        "email": "exemplo_student@gmail.com",
        "password": "123456",
        "samePasswords": "123456"
    }

    Saída(json):
    {
        "id": "59a2a34e-7e09-4f01-b9ff-da421569920e",
        "name": "Exemplo Nome",
        "email": "exemplo_student@gmail.com"
    }

### Fazer login(aluno):

    Método HTTP: POST

    Rota: /students/session

    Entrada(json):
    {
        "email": "exemplo_student@gmail.com",
        "password": "123456"
    }

    Saída(json):
    {
        "id": "59a2a34e-7e09-4f01-b9ff-da421569920e",
        "name": "Exemplo Nome",
        "email": "exemplo_student@gmail.com"
    }

### Virar aluno de algum professor:

    Método HTTP: POST

    Rota: /students/becomeAStudent

    Entrada(json):
    {
        "id_teacher": "46c0b3af-366b-4e48-8dad-5ede9475f352"
    }

    Saída(json):
    {
        "id": "cadd32a3-742f-456d-9026-12846942fb56",
        "id_students": "59a2a34e-7e09-4f01-b9ff-da421569920e",
        "id_teachers": "46c0b3af-366b-4e48-8dad-5ede9475f352"
    }

### Atualizar informações do Aluno:

    Método HTTP: PUT

    Rota: /students/update

    Entrada(json):
    {
        "name": "Exemplo Update"
    }

    Saída(json):
    {
        "id": "59a2a34e-7e09-4f01-b9ff-da421569920e",
        "name": "Exemplo Update",
        "email": "exemplo_student@gmail.com"
    }
