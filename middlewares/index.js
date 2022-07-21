const { validarCampos } = require("./validar-campos");
const { validarJWT } = require("./validar-jwt");
const { esAdminRole } = require("./validar-role");

module.exports = {
  validarCampos,
  validarJWT,
  esAdminRole,
};
