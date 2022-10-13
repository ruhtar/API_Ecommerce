# Sistema de Ecommerce 💰
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
------------------------------------------------------------------
 Path | Method | Description
 ---|---|---
 /pedidos            | GET    | Lista pedidos
 /pedidos/id_pedido     | GET    | Detalha pedido
 /pedidos            | POST   | Cadastra pedido
 /pedidos/id_pedido        | DELETE | Remove pedido
 ------------------------------------------------------------------
 Path | Method | Description
 ---|---|---
 /usuarios        | GET    | Lista usuarios
 /usuarios/cadastro  | POST    | Cadastra usuario
 /usuarios/login  | POST    | Loga usuario
 
 
 ## ℹ️ Author Info

[![Linkedin Badge](https://img.shields.io/badge/-Arthur-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/arthur-amorim-bs/)](https://www.linkedin.com/in/arthur-amorim-bs/) 
[![Gmail Badge](https://img.shields.io/badge/-arthur.amorim10@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:arthur.amorim10@gmail.com)](mailto:arthur.amorim10@gmail.com)
[![Twitter Badge](https://img.shields.io/badge/-@arthur_https-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/arthur_https)](https://twitter.com/arthur_https) 
