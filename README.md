
# Gerenciador de Campanhas

Este repositório contém uma aplicação completa para gerenciamento de campanhas, composta por uma API desenvolvida em NestJS e uma interface de usuário desenvolvida em NextJS.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação e Execução](#instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Passos para Instalação](#passos-para-instalação)
  - [Executando com Docker](#executando-com-docker)
- [Documentação da API](#documentação-da-api)
- [Acesso ao Frontend](#acesso-ao-frontend)
- [Estrutura do Projeto](#estrutura-do-projeto)

## Visão Geral

Esta aplicação foi projetada para facilitar o gerenciamento de campanhas. A API é responsável por fornecer dados e operações de backend, enquanto a interface de usuário permite que os usuários gerenciem campanhas de forma intuitiva.

## Tecnologias Utilizadas

- **Backend (API)**
  - [NestJS](https://nestjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [MySQL](https://www.mysql.com/)
  - [TypeORM](https://typeorm.io/)
  
- **Frontend (UI)**
  - [NextJS](https://nextjs.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [NextAuth](https://next-auth.js.org/)
  - [@material-tailwind/react](https://www.material-tailwind.com/)

- **Infraestrutura**
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)

## Funcionalidades

- **API**
  - Loging e Cadastro de usuários
  - Operações CRUD para campanhas
  - Integração com MySQL usando TypeORM
  - Serviço de background para atualização de campanhas

- **UI**
  - Tela de login e cadastro
  - Gerenciamento de campanhas
  - Autenticação com NextAuth

## Instalação e Execução

### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passos para Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/rafaelbf15/gerenciador-campanhas.git
    cd gerenciador-campanhas
    ```

2. Configure as variáveis de ambiente necessárias (verifique os arquivos `.env` no diretório da API e UI para obter exemplos).

### Executando com Docker

Para iniciar a aplicação usando Docker Compose, execute o comando a seguir na raiz do projeto:

```sh
docker-compose up --build
```

Este comando irá construir e iniciar todos os serviços definidos no arquivo `docker-compose.yml`.

## Documentação da API

A documentação da API está disponível no endpoint `/api-docs` após iniciar o servidor. Acesse a URL abaixo para visualizar a documentação interativa da API:

```
http://localhost:5000/swagger
```

## Acesso ao Frontend

Após iniciar a aplicação com Docker Compose, o frontend estará disponível no seguinte endpoint:

```
http://localhost:3000
```

## Estrutura do Projeto

```plaintext
.
├── gerenciador-campanhas
│   ├── docker-compose.yml
│   ├── gerenciador-campanhas-api
│   │   ├── Dockerfile
│   │   ├── src
│   │   ├── test
│   │   └── ...
│   ├── gerenciador-campanhas-ui
│   │   ├── Dockerfile
│   │   ├── src
│   │   ├── public
│   │   └── ...
└── README.md
```
