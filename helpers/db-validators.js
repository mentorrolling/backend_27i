const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

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

//para validar id en ruta PUT
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findOne({ _id: id });

  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

//validar categoria por id
const categoriaExiste = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

//validar Producto por id
const productoExiste = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El producto con el id ${id} no existe en la BD`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  categoriaExiste,
  productoExiste,
};
