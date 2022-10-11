const mysql = require("../database/mysql").pool;
const port = 4000 || process.env.PORT;

class PedidosController {
  static retornaTodosPedidos(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        `SELECT pedidos.id_pedido, pedidos.quantidade, produtos.id_produto, produtos.nome, produtos.preco FROM pedidos INNER JOIN produtos ON produtos.id_produto = pedidos.id_produto;`,
        (error, results, fields) => {
          if (error) return res.status(500).send({ error: error });
          const response = {
            quantidade: results.length,
            pedidos: results.map((item) => {
              return {
                id_pedido: item.id_pedido,
                quantidade: item.quantidade,
                produto: {
                  id_produto: item.id_produto,
                  nome: item.nome,
                  preco: item.preco,
                },
                request: {
                  tipo: "GET",
                  descricao: "Retorna os detalhes do item em questão",
                  url: process.env.URL_API + `pedidos/${item.id_pedido}`,
                },
              };
            }),
          };
          return res.status(200).send(response);
        }
      );
    });
  }
  static retornaUmPedido(req, res) {
    const id = req.params.id_pedido;
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ error: error });
      conn.query(
        "SELECT * FROM pedidos WHERE id_pedido = ?;",
        [id],
        (error, results, fields) => {
          if (error) return res.status(500).send({ error: error });
          if (results.length == 0)
            return res
              .status(404)
              .send({ message: "Não foram encontrados registros com esse id" });
          const response = {
            id_pedido: results[0].id_pedido,
            id_produto: results[0].id_produto,
            quantidade: results[0].quantidade,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os pedidos",
              url: process.env.URL_API + "/pedidos",
            },
          };
          return res.status(200).send(response);
        }
      );
    });
  }
  static criaUmPedido(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ error: error });
      conn.query(
        "SELECT * FROM produtos WHERE id_produto = ?;",
        [req.body.id_produto],
        (error, resultss, fields) => {
          if (resultss == 0)
            return res.status(404).send({ message: "Produto não encontrado" });

          mysql.getConnection((error, conn) => {
            if (error) return res.status(500).send({ error: error });
            conn.query(
              "INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?);",
              [req.body.id_produto, req.body.quantidade],
              (error, results, fields) => {
                conn.release();
                if (error) return res.status(500).send({ error: error });
                const response = {
                  mensagem: "Pedido criado com sucesso",
                  novoPedido: {
                    id_pedido: results.id_pedido,
                    id_produto: req.body.id_produto,
                    quantidade: req.body.quantidade,
                  },
                  request: {
                    tipo: "GET",
                    descricao: "Retorna todos os pedidos",
                    url: process.env.URL_API + "/pedidos",
                  },
                };
                return res.status(201).send(response);
              }
            );
          });
        }
      );
    });
  }
  static deletaUmPedido(req, res) {
    mysql.getConnection((error, conn) => {
      if (error) return res.status(500).send({ error: error });
      conn.query(
        `DELETE FROM pedidos WHERE id_pedido = ?;`,
        [req.params.id_pedido],
        (error, results, fields) => {
          if (error) return res.status(500).send({ error: error });
          const response = {
            messagem: "O pedido foi deletedo com sucesso",
          };
          return res.status(202).send(response);
        }
      );
    });
  }
}

module.exports = PedidosController;
