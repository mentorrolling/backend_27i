const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no existe en la BD`);
  }
};

const emailExiste = async (email) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ${email} ya existe en la BD`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
};
