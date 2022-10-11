const express = require("express");
const router = express.Router();
const ProdutosController = require("../controllers/ProdutosController");

router.get("/", ProdutosController.retornaTodosProdutos);
router.get("/:id_produto", ProdutosController.retornaUmProduto);
router.post("/", ProdutosController.criaUmProduto);
router.patch("/:id_produto", ProdutosController.alteraUmProduto);
router.delete("/:id_produto", ProdutosController.deletaUmProduto);

module.exports = router;
