const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas = ["categorias", "productos"];

//buscar categorias----------------------------------------------
const buscarCategorias = async (termino = "", res = response) => {
  //verificar si mandó el id de la categoria
  const isMongoID = ObjectId.isValid(termino);
  if (isMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //si la búsqueda se hace por nombre
  const regex = new RegExp(termino, "i");
  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "nombre");

  res.json({
    results: categorias,
  });
};

//Buscar productos--------------------------------
const buscarProductos = async (termino = "", res = response) => {
  //verificar si envió el id del producto
  const isMongoID = ObjectId.isValid(termino);

  if (isMongoID) {
    const producto = await Producto.findById(termino)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  //verificar si busca por nombre del producto
  //si la búsqueda se hace por nombre
  const regex = new RegExp(termino, "i");
  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  })
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  //ver si está incluida en colecciones permitidad

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "No hay búsqueda para esta acción",
      });
      break;
  }
};

module.exports = {
  buscar,
};
