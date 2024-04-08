# :pencil: [Vendas Conectadas - Teste Técnico]()

Uma API e um banco de dados para criação de vendas! Foi desenvolvida uma aplicação em Node.js utilizando o framework AdonisJs, juntamente com ORM Lucid para auxiliar o manuseio do banco, fazendo o CRUD de clientes, vendas, produtos, validações de usuário utilizando a biblioteca JsonWebToken e validações de entrada utilizando a biblioteca VineJs

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
- Controle de requisições através da biblioteca Vine
- É necessário um login para fazer uma postagem.
- Um CRUD para customeres e para Produtos

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

  Rota para a alteração de um produto com um id específico já existente no banco de dados.
  
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

  Rota para a deleção de um produto com um id específico já existente no banco de dados. (soft delete)

  > `soft delete`: Uma exclusão reversível marca um registro como inativo ou válido sem realmente excluí-lo do banco de dados. Podendo melhorar o desempenho e permitindo que dados “excluídos” sejam recuperados
  
  - Retorno:
  ```json
  "No body returned for response"
  ```
</details>

##

<details>
  <summary><strong>GET /products/disabled</strong></summary><br />
  
  > Necessário estar logado

  Rota para listagem de todos os produtos cadastrados que foram deletados(desativados) no banco de dados.
  
  - Retorno:
  ```json
[
	{
		"id": 1,
		"name": "mouse básico",
		"price": 7,
		"description": "mouse escritorio",
		"quantity": 3
	},

    /* ... */
]
  ```
</details>

##

<details>
  <summary><strong>PATCH /products/enable/:id</strong></summary><br />
  
  > Necessário estar logado

  Rota para a ativação de um produto com um id específico já existente no banco de dados que foi desativado pelo usuário.
  
  - Retorno:
  ```json
  "No body returned for response"
  ```
</details>

---

<details>
  <summary><strong>GET /customers</strong></summary><br />
  
  > Necessário estar logado

  Rota para listagem de todos os clientes cadastrados no banco de dados.
  
  - Retorno:
  ```json
[
    {
	    "id": 1,
	    "name": "Joao",
	    "cpf": "12312312312",
	    "sellerId": 1
	},

    /* ... */
]
  ```
</details>

##

<details>
  <summary><strong>GET /customers/:id</strong></summary><br />
  
  > Necessário estar logado

  Rota para listagem de um cliente com um id específico cadastrado no banco de dados.
  
  - Retorno:
  ```json
{
	"id": 1,
	"name": "Joao",
	"cpf": "12312312312",
	"sellerId": 1,
	"phone": {
		"id": 1,
		"customerId": 1,
		"number": 999999999
	},
	"address": {
		"id": 1,
		"country": "Brazil",
		"state": "state1",
		"city": "city1",
		"neighborhood": "test1",
		"number": 123,
		"complement": null,
		"reference": null,
		"customerId": 1
	},
	"sales": [
		{
			"id": 1,
			"quantity": 2,
			"unitPrice": 10,
			"totalPrice": 20,
			"dateSale": "2024-04-04T17:11:16.000+00:00",
			"customerId": 1,
			"productId": 2
		},
		{
			"id": 2,
			"quantity": 1,
			"unitPrice": 15,
			"totalPrice": 15,
			"dateSale": "2024-04-04T17:11:16.000+00:00",
			"customerId": 1,
			"productId": 3
		}
	]
}
  ```
</details>

##

<details>
  <summary><strong>POST /customers</strong></summary><br />
  
  > Necessário estar logado

  Rota para a criação de um cliente novo no banco de dados.
  
  - Entrada:
  ```json
{
	  "name": "Marcos",
	  "cpf": "12312312316",
	  "sellerId": 1,
	  "addressId": 1,
	  "numberPhone": 987654321,
	  "country": "Brazil",
	  "state": "Estado",
	  "city": "Cidade",
	  "neighborhood": "Vizinho",
	  "numberHouse": 8
}
  ```
  - Retorno:
  ```json
{
	  "id": 1,
	  "name": "Marcos"
}
  ```
</details>

##

<details>
  <summary><strong>PUT /customers/:id</strong></summary><br />
  
  > Necessário estar logado

  Rota para a alteração de um produto com um id específico já existente no banco de dados.
  
  - Entrada:
  ```json
  {
	  "name": "Joao",
	  "cpf": "12319912416",
	  "numberPhone": 987654321,
	  "country": "Brasil",
	  "state": "Estado",
	  "city": "Cidade",
	  "neighborhood": "Vizinho",
	  "numberHouse": 8
  }
  ```
  - Retorno:
  ```json
  {
	  "id": 1,
	  "name": "Joao",
	  "cpf": "12319912416",
	  "sellerId": 1,
  }
  ```
</details>

##

<details>
  <summary><strong>DELETE /customers/:id</strong></summary><br />
  
  > Necessário estar logado

  Rota para a deleção de um produto com um id específico já existente no banco de dados.
  
  - Retorno:
  ```json
  "No body returned for response"
  ```
</details>

---

<details>
  <summary><strong>POST /sales</strong></summary><br />
  
  > Necessário estar logado

  Rota para a criação de uma venda no banco de dados.
  
  - Entrada:
  ```json
  {
	  "quantity": 10,
	  "unitPrice": 5,
	  "totalPrice": 15,
	  "customerId": 3,
	  "productId": 1
  }
  ```
  - Retorno:
  ```json
  {
	  "quantity": 10,
	  "unitPrice": 5,
	  "totalPrice": 15,
	  "customerId": 3,
	  "productId": 1,
	  "dateSale": "2024-04-04T23:28:06.199+00:00",
	  "id": 1
  }
  ```
</details>

##

## :books: Como acessar localmente

  - Abra o terminal e clone o repositório.
  ```bash
    git clone https://github.com/DaniloBertolini/Vendas-Conectadas.git
  ```
  - Entre na pasta `backend` dentro de `Vendas-Conectadas`.
  ```bash
    cd Vendas-Conectadas/backend
  ```
  - Renomeie o `env.example` arquivo para `.env`.
  - Instale as dependências.
  ```bash
    npm install
  ```
  - Inicie o servidor de desenvolvimento.
  ```bash
   npm run dev
  ```
