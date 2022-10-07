const express = require("express");
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get("/", (req, res) => {
  res.status(200).send({
    mensagem: "deu certo GET",
  });
});

//RETORNA UM PRODUTO ESPECÍFICO
router.get("/:id_produto", (req, res) => {
  const id = req.params.id_produto;
  res.status(200).send({
    mensagem: "deu certo GET ",
    id: id,
  });
});
//INSERE UM PRODUTO
router.post("/", (req, res) => {
  const produto = {
    nome: req.body.nome,
    preco: req.body.preco,
  };
  res.status(201).send({
    mensagem: "Insere um produto",
    produtoCriado: produto,
  });
});
//ALTERA UM PRODUTO
router.patch("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "deu certo PATCH",
  });
});
//DELETA UM PRODUTO
router.delete("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "deu certo DELETE",
  });
});

module.exports = router;
