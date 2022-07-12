const { request, response } = require("express");

const bcrypt = require("bcryptjs");

// const { validationResult } = require("express-validator");

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
  //recibir la validación
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  //req =  res = Response
  const { nombre, email, password } = req.body;

  const usuario = new Usuario({ nombre, email, password });

  //validar si el email existe en la BD
  // const existeEmail = await Usuario.findOne({ email });
  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "El correo ya existe en la BD",
  //   });
  // }

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar en la BD
  await usuario.save();

  res.status(201).json({
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
