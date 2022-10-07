const express = require("express");
const router = express.Router();

//RETORNA TODOS OS PEDIDOS
router.get("/", (req, res) => {
  res.status(200).send({
    mensagem: "deu certo GET",
  });
});

//RETORNA UM PEDIDO ESPECÍFICO
router.get("/:id_pedido", (req, res) => {
  const id = req.params.id_pedido;
  res.status(200).send({
    mensagem: "deu certo GET ",
    id: id,
  });
});
//INSERE UM PEDIDO
router.post("/", (req, res) => {
  const pedido = {
    id_produto: req.body.id_produto,
    quantidade: req.body.quantidade,
  };
  res.status(201).send({
    mensagem: "Pedido criado com sucesso",
    pedidoCriado: pedido,
  });
});

//DELETA UM PEDIDO
router.delete("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "deu certo DELETE",
  });
});

module.exports = router;
