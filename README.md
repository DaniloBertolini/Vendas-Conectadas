# :pencil: [Vendas Conectadas]()

Uma API e um banco de dados para criação de vendas! Foi desenvolvida uma aplicação em Node.js utilizando o framework AdonisJs, juntamente com ORM para auxiliar o manuseio do banco, o Lucid, para fazer o CRUD de clientes, vendas, produtos e validações de usuário utilizando a biblioteca JsonWebToken.

## :bomb: Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJs](https://nodejs.org/en)
- [AdonisJs](https://docs.adonisjs.com/guides/introduction)
- [Vine](https://vinejs.dev/docs/introduction)
- [Lucid](https://lucid.adonisjs.com/docs/introduction)
- [MySQL](https://www.mysql.com/)
- [JsonWebToken](https://jwt.io/)

## :bulb: Funcionalidades

- Endpoints que serão conectados ao banco de dados
- Controle de usuários através de validação JWT.
- É necessário um login para fazer uma postagem.
- Um CRUD para Clientes e para Produtos

## :computer: Rotas do Sistema

<details>
  <summary><strong>GET /healthy</strong></summary><br />
  
Retorna uma mensagem confirmando que o Serviço está funcionando.

  - Retorno:
  ```json
  {
	  "backend": "OK"
  }
  ```
</details>

##

<details>
  <summary><strong>POST /signup</strong></summary><br />
  
   Rota para fazer cadastro de um usuário (email) que ainda não existe no banco de dados.

   - Entrada:
  ```json
  {
	  "email": "testemail@gmail.com",
	  "password": "senhasecreta"
  }
  ```
  - Retorno:
  ```json
  {
	   "email": "testemail@gmail.com",
  }
  ```
</details>

##

<details>
  <summary><strong>POST /login</strong></summary><br />
  
  Rota para fazer login de um usuário já cadastrado. Caso o email e senha estejam corretos, retorna um token do Usuário que acabou de Logar.
  
  - Entrada:
  ```json
  {
	  "email": "test@gmail.com",
	  "password": "senhasecreta"
  }
  ```
  - Retorno:
  ```json
  {
	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzODk1NH0.e7Bz_Jw7lMZyurLJ5imwe_549dBHB1EOchfAbTtuqv4"
  }
  ```
  > Token é necessário para rotas que precisam estar logados
</details>

##

<details>
  <summary><strong>GET /products</strong></summary><br />
  
  > Necessário estar logado

  Rota para listagem de todos os produtos cadastrados e que estão ativos no banco de dados.
  
  - Retorno:
  ```json
[
    {
	    "id": 1,
	    "name": "keyboard"
	},

    /* ... */
]
  ```
</details>

##

<details>
  <summary><strong>GET /products/:id</strong></summary><br />
  
  > Necessário estar logado

  Rota para listagem de um produto com um id específico cadastrado no banco de dados.
  
  - Retorno:
  ```json
{
	  "id": 1,
	  "name": "mouse",
	  "price": 5,
	  "description": "gaming mouse",
	  "quantity": 2,
	  "active": 1
}
  ```
</details>

##

<details>
  <summary><strong>POST /products</strong></summary><br />
  
  > Necessário estar logado

  Rota para a criação de um produto novo no banco de dados.
  
  - Entrada:
  ```json
  {
	  "name": "mouse",
	  "price": 5,
	  "description": "mouse gamer", (Opcional)
	  "quantity": 3
  }
  ```
  - Retorno:
  ```json
  {
	  "name": "mouse",
	  "price": 5,
	  "description": "mouse gamer",
	  "quantity": 3,
	  "id": 1
  }
  ```
</details>

##

<details>
  <summary><strong>PUT /products/:id</strong></summary><br />
  
  > Necessário estar logado

  Rota para a alteração de um produto já existente no banco de dados.
  
  - Entrada:
  ```json
  {
	  "name": "mouse básico",
	  "price": 7,
	  "description": "mouse escritorio",
	  "quantity": 3
  }
  ```
  - Retorno:
  ```json
  {
	  "id": 1,
	  "name": "mouse básico",
	  "price": 7,
	  "description": "mouse escritorio",
	  "quantity": 3,
	  "active": 1
  }
  ```
</details>

##

<details>
  <summary><strong>DELETE /products/:id</strong></summary><br />
  
  > Necessário estar logado

  Rota para a deleção de um produto já existente no banco de dados. (soft delete)

  > `soft delete`: Uma exclusão reversível marca um registro como inativo ou válido sem realmente excluí-lo do banco de dados. Podendo melhorar o desempenho e permitindo que dados “excluídos” sejam recuperados
  
  - Retorno:
  ```json
  "No body returned for response"
  ```
</details>
