const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Falha na autenticação" });
  }
};
