# API do Pizza System

Bem-vindo ao projeto **Pizza System API**! Esta API é projetada para gerenciar pizzas e pedidos de forma eficiente. Desenvolvida por Rogério Bayer, oferece endpoints para operações CRUD em pizzas, pedidos e autenticação de usuários.

## Índice

- [Visão Geral](#visão-geral)
- [Endpoints](#endpoints)
  - [Pizzas](#pizzas)
  - [Pedidos](#pedidos)
  - [Autenticação](#autenticação)
- [Autenticação](#autenticação)
- [Esquemas](#esquemas)
- [Servidor](#servidor)
- [Exemplos de Requisição](#exemplos-de-requisição)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

A **Pizza System API** fornece os seguintes recursos:
- **Pizzas**: Operações para criar, obter, atualizar e excluir pizzas.
- **Pedidos**: Gerenciamento de pedidos, incluindo a criação e visualização de pedidos.
- **Autenticação**: Registro e login de usuários para acesso seguro à API.

## Endpoints

### Pizzas

#### Obter todas as pizzas

- **Método:** `GET`
- **Endpoint:** `/pizzas`
- **Descrição:** Retorna uma lista de todas as pizzas.
- **Resposta:**
  - **200 OK**: Lista de pizzas

#### Criar uma nova pizza

- **Método:** `POST`
- **Endpoint:** `/pizzas`
- **Descrição:** Cria uma nova pizza.
- **Autenticação:** Requer token JWT
- **Corpo da Requisição:**
  ```json
  {
    "name": "Margherita",
    "description": "Pizza com molho de tomate e queijo",
    "price": 20.50,
    "ingredients": ["tomato", "mozzarella"],
    "size": "medium"
  }
  ```
- **Resposta:**
  - **201 Created**: Pizza criada com sucesso
  - **400 Bad Request**: Entrada inválida

#### Obter uma pizza por ID

- **Método:** `GET`
- **Endpoint:** `/pizzas/{id}`
- **Descrição:** Retorna detalhes de uma pizza específica.
- **Parâmetros:**
  - **id**: UUID da pizza
- **Resposta:**
  - **200 OK**: Detalhes da pizza
  - **404 Not Found**: Pizza não encontrada

#### Atualizar uma pizza

- **Método:** `PUT`
- **Endpoint:** `/pizzas/{id}`
- **Descrição:** Atualiza os detalhes de uma pizza existente.
- **Autenticação:** Requer token JWT
- **Parâmetros:**
  - **id**: UUID da pizza
- **Corpo da Requisição:** (Semelhante ao corpo da requisição de criação de pizza)
- **Resposta:**
  - **200 OK**: Pizza atualizada
  - **404 Not Found**: Pizza não encontrada
  - **400 Bad Request**: Entrada inválida

#### Excluir uma pizza

- **Método:** `DELETE`
- **Endpoint:** `/pizzas/{id}`
- **Descrição:** Exclui uma pizza.
- **Autenticação:** Requer token JWT
- **Parâmetros:**
  - **id**: UUID da pizza
- **Resposta:**
  - **204 No Content**: Pizza excluída com sucesso
  - **404 Not Found**: Pizza não encontrada

### Pedidos

#### Criar um pedido

- **Método:** `POST`
- **Endpoint:** `/orders`
- **Descrição:** Cria um novo pedido.
- **Autenticação:** Requer token JWT
- **Corpo da Requisição:**
  ```json
  {
    "user": "user-uuid",
    "pizzas": [
      {
        "pizza": "pizza-uuid",
        "quantity": 2
      }
    ],
    "totalPrice": 41.00,
    "status": "pending"
  }
  ```
- **Resposta:**
  - **201 Created**: Pedido criado com sucesso
  - **400 Bad Request**: Entrada inválida

#### Obter pedidos do usuário

- **Método:** `GET`
- **Endpoint:** `/orders`
- **Descrição:** Retorna uma lista de pedidos do usuário autenticado.
- **Autenticação:** Requer token JWT
- **Resposta:**
  - **200 OK**: Lista de pedidos
  - **500 Internal Server Error**: Erro no servidor

#### Obter um pedido por ID

- **Método:** `GET`
- **Endpoint:** `/orders/{id}`
- **Descrição:** Retorna detalhes de um pedido específico.
- **Autenticação:** Requer token JWT
- **Parâmetros:**
  - **id**: UUID do pedido
- **Resposta:**
  - **200 OK**: Detalhes do pedido
  - **404 Not Found**: Pedido não encontrado
  - **403 Forbidden**: Acesso negado
  - **500 Internal Server Error**: Erro no servidor

#### Atualizar o status de um pedido

- **Método:** `PUT`
- **Endpoint:** `/orders/{id}`
- **Descrição:** Atualiza o status de um pedido.
- **Autenticação:** Requer token JWT
- **Parâmetros:**
  - **id**: UUID do pedido
  - **status**: Novo status do pedido (pending, preparing, delivering, completed)
- **Corpo da Requisição:**
  ```json
  {
    "status": "preparing"
  }
  ```
- **Resposta:**
  - **200 OK**: Status do pedido atualizado
  - **404 Not Found**: Pedido não encontrado
  - **400 Bad Request**: Status inválido

### Autenticação

#### Registrar um novo usuário

- **Método:** `POST`
- **Endpoint:** `/auth/register`
- **Descrição:** Registra um novo usuário.
- **Corpo da Requisição:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "client"
  }
  ```
- **Resposta:**
  - **201 Created**: Usuário registrado com sucesso
  - **400 Bad Request**: Entrada inválida

#### Login de um usuário

- **Método:** `POST`
- **Endpoint:** `/auth/login`
- **Descrição:** Realiza login e retorna um token JWT.
- **Corpo da Requisição:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Resposta:**
  - **200 OK**: Usuário logado com sucesso
  - **401 Unauthorized**: Não autorizado

## Esquemas

### Pizza

```json
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "price": "number (float)",
  "ingredients": ["string"],
  "size": "string (small, medium, large)"
}
```

### Order

```json
{
  "id": "string (UUID)",
  "user": "string (UUID)",
  "pizzas": [
    {
      "pizza": "string (UUID)",
      "quantity": "integer"
    }
  ],
  "totalPrice": "number (float)",
  "status": "string (pending, preparing, delivering, completed)"
}
```

### User

```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string (email)",
  "password": "string",
  "role": "string (client, admin)"
}
```

### AuthToken

```json
{
  "token": "string"
}
```

## Servidor

O servidor de desenvolvimento local está disponível em:

- **URL:** `http://localhost:3003/api`
- **Descrição:** Servidor local de desenvolvimento
