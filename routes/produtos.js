const express = require("express");
const router = express.Router();
const ProdutosController = require("../controllers/ProdutosController");
const login = require("../middleware/login");

router.get("/", ProdutosController.retornaTodosProdutos);
router.get("/:id_produto", ProdutosController.retornaUmProduto);
router.post("/", login, ProdutosController.criaUmProduto);
router.patch("/:id_produto", login, ProdutosController.alteraUmProduto);
router.delete("/:id_produto", login, ProdutosController.deletaUmProduto);

module.exports = router;
