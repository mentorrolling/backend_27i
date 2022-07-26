const { Router } = require("express");

const { check } = require("express-validator");
const { productoExiste } = require("../helpers/db-validators");

const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

// const { validarCampos } = require("../middlewares/validar-campos");
// const { validarJWT } = require("../middlewares/validar-jwt");
// const { esAdminRole } = require("../middlewares/validar-role");

const {
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
  obtenerProducto,
  productoPost,
} = require("../controllers/productos");

const router = Router();

router.get("/", obtenerProductos);

//Listar producto por id
router.get(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(productoExiste), //me aseguro si existe un producto con ese ID 🤔
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria", "La categoría es obligatoria").notEmpty(),
    validarCampos,
  ],
  productoPost
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(productoExiste), //me aseguro si existe un producto con ese ID 🤔

    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(productoExiste), //me aseguro si existe un producto con ese ID 🤔
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
