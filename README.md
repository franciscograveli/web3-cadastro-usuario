# Gerenciador de tarefas

Sistema de agendamento de tarefas com cadastro e login de usuários.

- `api-agenda-tarefa`: API em Laravel
- `lista-tarefa`: front-end em Vue 3 + Vuetify

## Requisitos

- PHP 8.2+ e Composer
- Node.js e npm
- MySQL

## Como rodar

### 1. API (http://127.0.0.1:8000)

```bash
cd api-agenda-tarefa
composer install
cp .env.example .env
php artisan key:generate
```

No `.env`, configure o banco MySQL (crie antes um banco chamado `agenda-tarefa`):

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=agenda-tarefa
DB_USERNAME=root
DB_PASSWORD=
```

Depois:

```bash
php artisan migrate --seed
php artisan serve
```

### 2. Front-end (http://localhost:5173)

Em outro terminal:

```bash
cd lista-tarefa
npm install
npm run dev
```

Abra http://localhost:5173, clique em **Cadastre-se** para criar uma conta e faça login.

## Testes da API

```bash
cd api-agenda-tarefa
php artisan test
```

Repositório: https://github.com/franciscograveli/web3-cadastro-usuario