# Estudaê

Estudaê é um sistema de gerenciamento de tarefas acadêmicas desenvolvido para ajudar estudantes a organizarem provas, trabalhos, projetos e estudos em um único lugar.

## 📌 Sobre o projeto

Este projeto foi desenvolvido com foco em demonstrar conhecimento em desenvolvimento full stack, incluindo:

- frontend em HTML, CSS e JavaScript
- backend em Java com Spring Boot
- persistência de dados em banco relacional
- API REST para comunicação entre camadas
- CRUD completo de tarefas e usuários
- dashboard com métricas de produtividade

## ✨ Funcionalidades

- Cadastro e login de usuário
- Criação de tarefas
- Edição de tarefas
- Exclusão de tarefas
- Marcação como concluída
- Definição de data de entrega
- Categorias: Trabalho, Prova, Projeto e Estudo
- Filtros por categoria e status
- Dashboard com:
  - total de tarefas
  - pendentes
  - concluídas
  - próximas do prazo

## 🛠️ Tecnologias utilizadas

- Java 17
- Spring Boot 3
- Spring Data JPA
- H2 Database (desenvolvimento local)
- PostgreSQL (estrutura relacional)
- HTML
- CSS
- JavaScript
- Swagger / OpenAPI

## 🗂️ Estrutura do projeto

```text
estudae/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── target/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   ├── dashboard.html
│   ├── css/
│   └── js/
├── database/
│   └── schema.sql
├── README.md
├── LINKEDIN_POST.md
├── docker-compose.yml
├── .gitignore
└── LICENSE
```

## 🚀 Como executar

### 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/estudae.git
cd estudae
```

### 2. Iniciar o banco de dados

```bash
docker compose up -d
```

### 3. Rodar o backend

```bash
cd backend
mvn spring-boot:run
```

### 4. Abrir o frontend

Abra a página `frontend/index.html` no navegador.

### 5. Acessar a documentação da API

```text
http://localhost:8080/swagger-ui.html
```

## 🧪 Validação

O projeto foi validado com build do backend com Maven:

```bash
cd backend
mvn test
```

Resultado esperado: BUILD SUCCESS.

## 📊 API principal

### Usuário

- POST `/api/users` — cadastro
- POST `/api/login` — login

### Tarefas

- GET `/api/tasks?userId={id}` — listar tarefas
- GET `/api/tasks/{id}` — buscar tarefa por ID
- POST `/api/tasks?userId={id}` — criar tarefa
- PUT `/api/tasks/{id}?userId={id}` — atualizar tarefa
- DELETE `/api/tasks/{id}?userId={id}` — excluir tarefa
- PATCH `/api/tasks/{id}/complete?userId={id}` — alternar status de conclusão

## 🎯 Objetivo profissional

Este projeto foi pensado para ser um diferencial no portfólio, mostrando que o aluno consegue desenvolver:

- frontend responsivo
- backend com Java e Spring Boot
- API REST
- relacionamento entre entidades no banco
- persistência com JPA
- CRUD completo
- solução funcional com foco em experiência do usuário

## 👨‍💻 Aprendizados

Durante o desenvolvimento, foram reforçados conhecimentos em:

- arquitetura em camadas
- integração entre frontend e backend
- uso de JPA/Hibernate
- definições de endpoints REST
- organização de projetos em Java
- criação de projetos com foco em portfólio profissional

## 📎 Licença

Este projeto está disponível para fins de estudo e portfólio.
