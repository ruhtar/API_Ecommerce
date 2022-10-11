const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/UsuariosController");

router.get("/", UsuariosController.mostraUsuarios);
router.post("/cadastro", UsuariosController.cadastraUsuario);

module.exports = router;
