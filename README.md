# API_Ecommerce
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

 
 - [x] Cadastro de pedido (Requer login do usuário)
 - [x] Listagem de pedido
 - [x] Remover pedido (Requer login do usuário)
 - [x] Detalhar pedido 
 
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
 
 ### Endpoints

 Path | Method | Description
 ---|---|---
 /produtos           | GET    | Lista produtos
  /produto/id_produto         | GET    | Detalha produto
 /produtos           | POST   | Cadastra produto
 /produto/id_produto         | PUT    | Atualiza produto
 /produto/id_produto        | DELETE | Remove produto
 /autores/id        | GET    | Detalha autor
 /livros            | GET    | Lista livros
 /livros            | POST   | Cadastra livro
 /livros            | PUT    | Atualiza livro
 /livros/id         | DELETE | Remove livro
 /livros/id         | GET    | Detalha livro
 /relatorios/autor  | GET    | Exibe relatório
