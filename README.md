# Encontrando Professores

Este projeto é referente ao desafio da segunda etapa do programa de estágio da da MB Labs

## Descrição:

Sistema que possibilita alunos de encontrarem professores de qualquer matéria(desde que tenha algum professor que ministre aula da matéria) e se tornar aluno do professor que quiser.

<!--
## Tecnologias utilizadas:

Docker
docker run --name NomeDaImagemASerCriada -e POSTGRES_PASSWORD=docker -p 5555:5432 -d postgre
-->

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
    05 - Como professor, eu quero listar todos os meus alunos                                  - A Fazer

### Aluno:

    01 - Como aluno, eu quero criar uma conta                                              - Feito
    02 - Como aluno, eu quero fazer login em minha conta                                   - Feito
    03 - Como aluno, eu quero me tornar aluno de algum professor                           - A Fazer
    04 - Como aluno, eu quero editar minhas informações                                    - A Fazer
    05 - Como aluno, eu quero recuperar minhas informações pessoais para ver no meu perfil - A Fazer
    06 - Como aluno, eu quero listar todos os meus professores                             - A Fazer
    07 - Como aluno, eu quero pesquisar pelo nome dos professores                          - A fazer
    08 - Como aluno, eu quero pesquisar por matéria                                        - A fazer

## Utilização da API:

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

### Criar Sessão do Professor:

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

##

##

##
