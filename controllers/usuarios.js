const { request, response } = require("express");

const usuariosGet = (req = request, res) => {
  const { q, limit } = req.query;

  res.json({
    msg: "Petición GET - Controllers",
    q,
    limit,
  });
};

const usuarioPost = (req = request, res = response) => {
  //req =  res = Response
  const { nombre, id, email } = req.body;

  res.json({
    msg: "Petición POST - Controllers",
    nombre,
    id,
    email,
  });
};

const usuarioPut = (req, res) => {
  //req =  res = Response
  const { id } = req.params;
  res.json({
    msg: "Petición PUT - Controllers",
    id,
  });
};

const usuarioDelete = (req, res) => {
  //req =  res = Response
  res.json({
    msg: "Petición DELETE - Controllers",
  });
};

module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
