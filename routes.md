# Documentação da API

## Endpoints

# Rota Admin

### **1. POST** `/login`

- **Descrição**: Realiza o login de um administrador.

- **Entrada**:

  - Corpo da requisição:
    ```json
    {
      "email": "admin@example.com",
      "password": "password123"
    }
    ```

- **Retorno**:
  - Em caso de sucesso:
    ```json
    {
      "success": "Acesso liberado"
    }
    ```
  - Em caso de erro (exemplo: credenciais ausentes ou incorretas):
    ```json
    {
      "error": "Email e senha devem ser enviados"
    }
    ```
    ou
    ```json
    {
      "error": "Email ou senha incorretos"
    }
    ```

---

### **2. POST** `/register`

- **Descrição**: Realiza o registro de um novo administrador.

- **Entrada**:

  - Corpo da requisição:
    ```json
    {
      "email": "newadmin@example.com",
      "password": "newpassword456"
    }
    ```

- **Retorno**:
  - Em caso de sucesso:
    ```json
    {
      "status": "Admin criado com sucesso",
      "data": {
        "email": "newadmin@example.com"
      }
    }
    ```
  - Em caso de erro (exemplo: e-mail já registrado ou dados faltando):
    ```json
    {
      "error": "Usuário já cadastrado"
    }
    ```
    ou
    ```json
    {
      "error": "Email ou senha está faltando"
    }
    ```

### 2. **Clientes**

- **GET** `/list/:page`

  - **Descrição**: Lista de clientes, paginada.
  - **Parâmetro**: `page` (opcional, valor padrão é 1).
  - **Retorna**:
    ```json
    {
      "page": 1,
      "totalPages": 5,
      "clients": [
        { "id": "1", "name": "Alice", "email": "alice@example.com" },
        { "id": "2", "name": "Bob", "email": "bob@example.com" }
      ]
    }
    ```

- **GET** `/:clientId`

  - **Descrição**: Detalhes de um cliente específico.
  - **Parâmetro**: `clientId` (ID do cliente).
  - **Retorna**:
    ```json
    {
      "id": "1",
      "name": "Alice",
      "email": "alice@example.com",
      "address": "123 Main St, Springfield",
      "phone": "555-1234"
    }
    ```

- **POST** `/register`
  - **Descrição**: Registro de um novo cliente.
  - **Recebe**: Dados do cliente (`name`, `email`, etc.).
  - **Retorna**:
    ```json
    {
      "success": true,
      "message": "Client registered successfully",
      "clientId": "67890"
    }
    ```

---

### 3. **Home**

- **GET** `/`
  - **Descrição**: Endpoint de teste.
  - **Retorna**:
    ```json
    {
      "message": "hello, world!"
    }
    ```

---

### 4. **Pedidos**

- **POST** `/create`

  - **Descrição**: Criação de um novo pedido.
  - **Recebe**: Dados do pedido (`clientId`, `products`).
  - **Retorna**:
    ```json
    {
      "success": true,
      "message": "Order created successfully",
      "orderId": "54321"
    }
    ```

- **GET** `/:clientId`

  - **Descrição**: Listagem de pedidos de um cliente específico.
  - **Parâmetro**: `clientId` (ID do cliente).
  - **Retorna**:
    ```json
    {
      "clientId": "1",
      "orders": [
        { "orderId": "54321", "status": "Pending", "total": 150.0 },
        { "orderId": "98765", "status": "Completed", "total": 200.0 }
      ]
    }
    ```

- **POST** `/pay`
  - **Descrição**: Pagamento de um pedido.
  - **Recebe**: Dados do pagamento (`orderId`, `paymentMethod`).
  - **Retorna**:
    ```json
    {
      "success": true,
      "message": "Order paid successfully",
      "orderId": "54321"
    }
    ```

---

### 5. **Produtos**

- **GET** `/list/:page`

  - **Descrição**: Lista de produtos, paginada.
  - **Parâmetro**: `page` (opcional, valor padrão é 1).
  - **Retorna**:
    ```json
    {
      "page": 1,
      "totalPages": 10,
      "products": [
        { "id": "101", "name": "Product A", "price": 50.0 },
        { "id": "102", "name": "Product B", "price": 30.0 }
      ]
    }
    ```

- **GET** `/:productName`

  - **Descrição**: Detalhes de um produto específico.
  - **Parâmetro**: `productName` (nome do produto).
  - **Retorna**:
    ```json
    {
      "id": "101",
      "name": "Product A",
      "description": "High-quality product",
      "price": 50.0,
      "stock": 20
    }
    ```

- **POST** `/create`
  - **Descrição**: Criação de um novo produto.
  - **Recebe**: Dados do produto (`name`, `description`, `price`) e uma imagem (`img`).
  - **Retorna**:
    ```json
    {
      "success": true,
      "message": "Product created successfully",
      "productId": "101"
    }
    ```
