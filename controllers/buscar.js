const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas = ["categorias", "productos"];

//funcion para buscar por categoria
const buscarCategorias = async (termino = "", res = response) => {
  //verificar si me mandó el id
  const isMongoID = ObjectId.isValid(termino);
  if (isMongoID) {
    const categoria = await Categoria.findById(id);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //si la busqueda se hace por el nombre
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "nombre");

  res.json({
    results: categorias,
  });
};

//Funcion para buscar productos
const buscarProductos = async (termino = "", res = response) => {
  //verificar si me mandó el id
  const isMongoID = ObjectId.isValid(termino);
  if (isMongoID) {
    const producto = await Producto.findById(id);
    return res.json({
      results: producto ? [producto] : [],
    });
  }
  //si la busqueda se hace por el nombre
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  //ver si la coleccion esta en las permitidas
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  //verificar que coleccion es la que se recibio
  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No hay busqueda para esta acción",
      });
      break;
  }
};

module.exports = {
  buscar,
};
