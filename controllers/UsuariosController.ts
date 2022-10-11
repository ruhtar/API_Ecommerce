export{}
const mysql = require("../mysql").pool;
const port = 4000 || process.env.PORT
const bcrypt = require("bcrypt");

class UsuariosController {
  static cadastraUsuario(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ error: error });
      bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
        if (errBcrypt) return res.status(500).send({ error: errBcrypt });
        conn.query(
          `INSERT INTO usuarios (email, senha) VALUES (?,?)`,
          [req.body.email, hash],
          (error, results, fields) => {
            if (error) return res.status(500).send({ error: error });
            conn.release();
            const response = {
              message: "Usuário criado com sucesso",
              usuarioCriado: {
                id_usuario: results.insertId,
                email: req.body.email,
              },
            };
            return res.status(201).send(response);
          }
        );
      });
    });
  }
  static mostraUsuarios(req, res) {
    mysql.getConnection((err, conn) => {
      if (err) return res.status(500).send({ error: err });
      conn.query("SELECT * FROM usuarios;", (error, results, fields) => {
        if (error) return res.status(500).send({ error: error });
        const response = {
          Usuarios: results.map((item) => {
            return {
              id_usuario: item.id_usuario,
              email: item.email,
            };
          }),
        };
        return res.status(200).send(response);
      });
    });
  }
}

module.exports = UsuariosController;
