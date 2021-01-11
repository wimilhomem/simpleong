const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const { errors } = require("celebrate");

app.use(cors());
app.use(express.json());

/**
 * rota  - recursos
 */

/***
 *
 * tipos de paramentros de uma rota **
 *
 * Query params: parametros nomeados na rota após *?* (filtros, paginacao) user?nome=nome
 * Route Params: paramentros utilizados para identificar recursos user/1
 * Request Body: corpo da requisição, utilizado para criar ou alterar recursos
 *
 */

/**
 * Driver: select * from users;
 * QUery Builder: table ('users)
 */

app.use(routes);
app.use(errors());

app.listen(3333);

module.exports = app;
