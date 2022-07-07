const { request, response } = require("express");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res) => {
  const { q, limit } = req.query;

  res.json({
    msg: "Petición GET - Controllers",
    q,
    limit,
  });
};

const usuarioPost = async (req = request, res = response) => {
  //req =  res = Response
  const { nombre, email, password } = req.body;

  const usuario = new Usuario({ nombre, email, password });
  await usuario.save();

  res.json({
    msg: "Usuario creado con éxito!",
    usuario,
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
