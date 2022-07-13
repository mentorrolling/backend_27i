const { request, response } = require("express");

const bcrypt = require("bcryptjs");

// const { validationResult } = require("express-validator");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res) => {
  const { limite = 5, desde = 0 } = req.query;

  // const usuarios = await Usuario.find({ estado: true })
  //   .skip(desde)
  //   .limit(limite);

  // const total = await Usuario.countDocuments({ estado: true });

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(desde).limit(limite),
  ]);

  res.json({
    total,
    usuarios,
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

const usuarioPut = async (req, res) => {
  //req =  res = Response
  const { id } = req.params;
  const { _id, password, email, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Usuario actualizado",
    usuario,
  });
};

const usuarioDelete = async (req, res) => {
  const { id } = req.params;

  //Borrar de forma física de la BD
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

  //Inactivar usuario
  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: "Usuario eliminado de la BD",
    usuarioBorrado,
  });
};

module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
