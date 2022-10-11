const express = require("express");
const router = express.Router();
const PedidosController = require("../controllers/PedidosController.js");

router.get("/", PedidosController.retornaTodosPedidos);
router.get("/:id_pedido", PedidosController.retornaUmPedido);
router.post("/", PedidosController.criaUmPedido);
router.delete("/", PedidosController.deletaUmPedido);

module.exports = router;
