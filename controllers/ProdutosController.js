const mysql = require("../database/mysql").pool;

class ProdutosController {
  static retornaTodosProdutos(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query("SELECT * FROM produtos;", (error, results, fields) => {
        //conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          quantidade: results.length,
          produtos: results.map((item) => {
            return {
              id_produto: item.id_produto,
              nome: item.nome,
              preco: item.preco,
              request: {
                tipo: "GET",
                descricao: "Retorna os detalhes do item em questão",
                url: URL + `/produtos/${item.id_produto}`,
              },
            };
          }),
        };
        return res.status(200).send(response);
      });
    });
  }
  static retornaUmProduto(req, res) {
    const id = req.params.id_produto;
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "SELECT * FROM produtos WHERE id_produto = ?;",
        [id],
        (error, results, fields) => {
          if (error) return res.status(500).send({ error: error });
          if (results.length == 0)
            return res
              .status(404)
              .send({ message: "Não foram encontrados registros com esse id" });
          const response = {
            id_produto: results[0].id_produto,
            nome: results[0].nome,
            preco: results[0].preco,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os produtos",
              url: process.env.URL + `/produtos`,
            },
          };
          return res.status(200).send(response);
        }
      );
    });
  }
  static criaUmProduto(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ message: error });
      conn.query(
        "INSERT INTO produtos (nome, preco) VALUES (?,?)",
        [req.body.nome, req.body.preco],
        (error, results, field) => {
          conn.release(); //IMPORTANTE LIBERAR A CONEXÃO. A POOL TEM UM LIMITE!!
          if (error) return res.status(500).send({ error: error });
          console.log(results);

          const response = {
            mensagem: "Produto criado com sucesso!",
            produtoCriado: {
              //id_produto: results[0].id_produto,
              nome: req.body.nome,
              preco: req.body.preco,
            },
            request: {
              tipo: "POST",
              descricao: "Retorna todos os produtos",
              url: process.env.URL + `/produtos`,
            },
          };
          return res.status(201).send(response);
        }
      );
    });
  }
  static alteraUmProduto(req, res) {
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
        (error, results, fields) => {
          if (error) return res.status(500).send({ error: error });
          const response = {
            id_produto: id,
            nome: novoNome,
            preco: novoPreco,
            request: {
              tipo: "PATCH",
              descricao: "Retorna todos os produtos",
              url: process.env.URL + `/produtos`,
            },
          };
          return res.status(202).send(response);
        }
      );
    });
  }
  static deletaUmProduto(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ error: error });
      conn.query(
        `DELETE FROM produtos WHERE id_produto = ?;`,
        [req.params.id_produto],
        (error, resultss, fields) => {
          if (error) return res.status(500).send({ error: error });
          const response = {
            messagem: "O produto foi deletedo com sucesso",
          };
          return res.status(202).send(response);
        }
      );
    });
  }
}

module.exports = ProdutosController;
