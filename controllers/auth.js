const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Email | Password son incorrectos",
      });
    }

    //verificar que el usuario esté activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "usuario suspendido",
      });
    }

    //verificar la contraseña
    const validaPassword = bcrypt.compareSync(password, usuario.password);

    if (!validaPassword) {
      return res.status(400).json({
        msg: "Email | Password son incorrectos",
      });
    }

    //generar un token
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Comuníquese con el administrador",
    });
  }
};

module.exports = {
  login,
};
