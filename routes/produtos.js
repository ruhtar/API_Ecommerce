const express = require("express");
const port = 4000 || process.env.PORT;
const router = express.Router();
const mysql = require("../mysql").pool;

//RETORNA TODOS OS PRODUTOS
router.get("/", (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM produtos;", (error, resultado, fields) => {
      //conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: resultado.length,
        produtos: resultado.map((item) => {
          return {
            id_produto: item.id_produto,
            nome: item.nome,
            preco: item.preco,
            request: {
              tipo: "GET",
              descricao: "Retorna os detalhes do item em questão",
              url: `http://localhost:${port}/produtos/${item.id_produto}`,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
});
//RETORNA UM PRODUTO ESPECÍFICO
router.get("/:id_produto", (req, res) => {
  const id = req.params.id_produto;
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE id_produto = ?;",
      [id],
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (resultado.length == 0)
          return res
            .status(404)
            .send({ message: "Não foram encontrados registros com esse id" });
        const response = {
          id_produto: resultado[0].id_produto,
          nome: resultado[0].nome,
          preco: resultado[0].preco,
          request: {
            tipo: "GET",
            descricao: "Retorna todos os produtos",
            url: `http://localhost:${port}/produtos`,
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});
//INSERE UM PRODUTO
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ message: error });
    }
    conn.query(
      "INSERT INTO produtos (nome, preco) VALUES (?,?)",
      [req.body.nome, req.body.preco],
      (error, resultado, field) => {
        conn.release(); //IMPORTANTE LIBERAR A CONEXÃO. A POOL TEM UM LIMITE!!
        if (error) return res.status(500).send({ error: error });
        console.log(resultado);

        const response = {
          mensagem: "Produto criado com sucesso!",
          produtoCriado: {
            //id_produto: resultado[0].id_produto,
            nome: req.body.nome,
            preco: req.body.preco,
          },
          request: {
            tipo: "POST",
            descricao: "Retorna todos os produtos",
            url: `http://localhost:${port}/produtos`,
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});
//ALTERA UM PRODUTO
router.patch("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;
  const novoNome = req.body.nome;
  const novoPreco = req.body.preco;
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });

    conn.query(
      `UPDATE produtos SET 
        nome = ?,
        preco = ?
      WHERE id_produto = ?;`,
      [novoNome, novoPreco, id],
      (error, resultado, fields) => {
        if (error) return res.status(500).send({ error: error });
        const response = {
          id_produto: id,
          nome: novoNome,
          preco: novoPreco,
          request: {
            tipo: "PATCH",
            descricao: "Retorna todos os produtos",
            url: `http://localhost:${port}/produtos`,
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});
//DELETA UM PRODUTO
router.delete("/:id_produto", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });
    conn.query(
      `DELETE FROM produtos WHERE id_produto = ?;`,
      [req.params.id_produto],
      (error, resultados, fields) => {
        if (error) return res.status(500).send({ error: error });
        return res
          .status(202)
          .send({ messagem: "Produto removido com sucesso" });
      }
    );
  });
});

module.exports = router;
