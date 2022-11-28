# Encontrando Professores

Este projeto é referente ao desafio da segunda etapa do programa de estágio da da MB Labs

## Descrição:

Sistema que possibilita alunos de encontrarem professores de qualquer matéria e se tornar aluno do professor que quiser.

## Tabelas e Atributos:

### teachers

    id
    name
    email
    password
    matter
    id_students_of_a_teacher

id_students_of_a_teacher -> Chave estrangeira

### students

    id
    name
    email
    password

### students_of_a_teacher

    id
    id_students

id_students -> Chave estrangeira

## Histórias de Usuário:

### Professor

    01 - Como professor, eu quero criar uma conta                                              - A Fazer
    02 - Como professor, eu quero editar minhas informações                                    - A Fazer
    03 - Como professor, eu quero recuperar minhas informações pessoais para ver no meu perfil - A Fazer
    04 - Como professor, eu quero listar todos os meus alunos                                  - A Fazer

### Aluno

    01 - Como aluno, eu quero criar uma conta                                              - A Fazer
    02 - Como aluno, eu quero editar minhas informações                                    - A Fazer
    03 - Como aluno, eu quero recuperar minhas informações pessoais para ver no meu perfil - A Fazer
    04 - Como aluno, eu quero listar todos os meus professores                             - A Fazer
    05 - Como aluno, eu quero pesquisar pelo nome dos professores                          - A fazer
    06 - Como aluno, eu quero pesquisar por matéria                                        - A fazer
