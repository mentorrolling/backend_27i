const { request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No se reconoce el token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer los datos del usuario
    const usuario = await Usuario.findById(uid);

    //si el usuario no existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    //verificar si el usuario esta activo

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
