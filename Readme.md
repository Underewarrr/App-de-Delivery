
***O cliente e a pessoa vendodra que adminstra o sistema, devem conseguir acessar via login.***
-  A pessoa cliente, que compra da lista de produtos
-  A pessoa vendedora, que aprova, prepara e entrega
-  A pessoa administradora, que gerencia quem usa o aplicativo

***comunicação entre clientes e vendedores***

O cliente faz o pedido e compra do seu "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. 

Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". 

Ambos possuem detalhes sobre seus pedidos.
Quando o cliente faz o pedido, o pedido aparece para a pessoa vendedora em seu dash de pedidos após a atualização da página. 

O mesmo acontece para o cliente ele ira receber as atualizações de seus pedidos.


## Diagrama de entidades
![image](https://user-images.githubusercontent.com/74227915/220192618-65e92586-53ea-47c1-a9ff-c7ae529cd86e.png)


## Tecnologias Utilizadas Front-end
- React
- React Bootstrap
- React Hooks
- React Context
- TypeScript

## Tecnologias Utilizadas Back-end
- TypeScript
- NodeJs
- Express
- Sequelize
- Docker
- MySQL
- JWT
- Joi
- Mocha
- Sinnon
- Chai 

## Endpoints

#### Usuário

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Criar um novo usuário e retorna o token | /login |
| `POST` | Criar um novo usuário e retorna o token | /register |
| `GET` | Retorna os dados não sensíveis de todos os usuário | /sellers |


Na requisição POST, é necessário informar a os dados o usuário no formato a seguir:

```
{
  "email": "usuario-exemplo@email.com",
  "password": "123456",
}
```

Na requisição GET, é necessário informar a os dados o no formato a seguir:

```
{
  "role": "seller",
}
```

#### Produtos
| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os pedidos cadastrados | /products |

#### Checkout
| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Retorna todos os pedidos cadastrados | /checkout |

Na requisição POST, é necessário informar um id de um token valido no header.autorhization:

```
{
  "userId": "req.headers.authorization",
}
```

#### Pedidos

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Criação de um produto | /orders/customer |
| `GET` | Lista todos os produtos | /orders/seller |
| `GET` | Lista todos os produtos | /orders/:id |
| `PATCH` | Lista todos os produtos | /orders/:id |

Na requisição GET /orders/customer, é necessário informar um id de um token valido no header.autorhization:

```
{
  "userId": "req.headers.authorization",
}
```

Na requisição GET /orders/seller, é necessário informar um id de um token valido no header.autorhization:

```
{
  "userId": "req.headers.authorization",
}
```
Na requisição GET /orders/:id, é necessário informar um id

```
{
  "userId": "1",
}
```

Na requisição PATCH /orders/:id, é necessário informar um id e um status a ser atualizado

```
{
  "userId": "1",
  "status": "novo status
}
```
