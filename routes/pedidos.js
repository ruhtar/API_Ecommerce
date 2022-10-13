const express = require("express");
const router = express.Router();
const PedidosController = require("../controllers/PedidosController.js");
const login = require("../middleware/login");

router.get("/", PedidosController.retornaTodosPedidos);
router.get("/:id_pedido", PedidosController.retornaUmPedido);
router.post("/:id_pedido", login, PedidosController.criaUmPedido);
router.delete("/:id_pedido", login, PedidosController.deletaUmPedido);

module.exports = router;
