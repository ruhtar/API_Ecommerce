const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const rotaProdutos = require("./routes/produtos");
const rotaPedidos = require("./routes/pedidos");
const rotaUsuarios = require("./routes/usuarios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/pedidos", rotaPedidos);
app.use("/produtos", rotaProdutos);
app.use("/usuarios", rotaUsuarios);

//Tratamento de erros quando não encontra a rota
app.use((req, res, next) => {
  const error = new Error("Não encontrado.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    mensagem: error.message,
  });
});

//Abrindo servidor
app.listen(port, () => {
  console.log("Servidor aberto na porta 4000");
});
