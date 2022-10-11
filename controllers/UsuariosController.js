const mysql = require("../database/mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsuariosController {
  static cadastraUsuario(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ error: error });
      conn.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [req.body.email],
        (error, results, fields) => {
          if (error) return res.status(500).send({ error: error });
          if (results.length > 0)
            return res.status(409).send({ message: "Email já cadastrado" });
          else {
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
          }
        }
      );
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
  static logaUsuario(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ error: error });
      conn.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [req.body.email],
        (error, results, fields) => {
          conn.release();
          if (error) return res.status(500).send({ error: error });
          if (results.length <= 0)
            return res.status(401).send({ message: "Falha na autenticação" });
          bcrypt.compare(req.body.senha, results[0].senha, (error, result) => {
            if (error)
              return res.status(401).send({ message: "Falha na autenticação" });
            if (result) {
              const token = jwt.sign(
                {
                  id_usuario: results[0].id_usuario,
                  email: results[0].email,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h",
                }
              );
              return res
                .status(200)
                .send({ message: "Autenticado com sucesso :)", token: token });
            }
            return res.status(401).send({ message: "Falha na autenticação" });
          });
        }
      );
    });
  }
}

module.exports = UsuariosController;
