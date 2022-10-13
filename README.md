# Sistema de Ecommerce
API feita em NodeJS com o framework Express utilizando o banco de dados MySQL. 
A API foi feita na arquitetura REST e realiza um CRUD no banco de dados escolhido.
A aplicação criptografa a senha do usuário e possui autenticação de login via JWT. 
Algumas endpoints só são permitidos caso o usuário esteja logado, isto é, mande via Headers o token gerado pelo login correto através de email e senha.

## 🔨 Funcionalidades do projeto

 - [x] Listagem de produtos 
 - [x] Detalhar produto
 - [x] Cadastro de produto (Requer login do usuário)
 - [x] Atualizar produto (Requer login do usuário)
 - [x] Remover produto (Requer login do usuário)
------------------------------------------------------------------
 - [x] Listagem de pedido
 - [x] Detalhar pedido 
 - [x] Cadastro de pedido (Requer login do usuário)
 - [x] Remover pedido (Requer login do usuário)
------------------------------------------------------------------
 - [x] Cadastro de usuário
 - [x] Listagem de usuários
 - [x] Login de usuário

## ✔️ Técnicas e tecnologias utilizadas

 - ``NodeJS``
 - ``Express``
 - ``Json Web Token``
 - ``Bcrypt``
 - ``MySQ``
 - ``Postman``
 
 ### 🎯 Endpoints

 Path | Method | Description
 ---|---|---
 /produtos           | GET    | Lista produtos
 /produto/id_produto         | GET    | Detalha produto
 /produtos           | POST   | Cadastra produto
 /produtos/id_produto         | PATCH    | Atualiza produto
 /produtos/id_produto        | DELETE | Remove produto
------------------------------------------------------------------------
 /pedidos            | GET    | Lista pedidos
 /pedidos/id_pedido     | GET    | Detalha pedido
 /pedidos            | POST   | Cadastra pedido
 /pedidos/id_pedido        | DELETE | Remove pedido
--------------------------------------------------------------------------
 /usuarios/        | GET    | Lista usuarios
 /usuarios/cadastro  | POST    | Cadastra usuario
 /usuarios/login  | POST    | Loga usuario
 
 
 ## Author Info

- Twitter - [@arthur_https](https://twitter.com/http_ruhtar)
- Linkedin - [Arthur Amorim](https://www.linkedin.com/in/arthur-amorim-bs/)
