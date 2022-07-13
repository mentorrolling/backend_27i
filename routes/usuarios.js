const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/usuarios");

const router = Router();
const { check } = require("express-validator");

router.get("/", usuariosGet);

//POST postear
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuarioPost
);

//PUT Actualizar
router.put(
  "/:id",
  [
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuarioPut
);

//DELETE Borrar
router.delete(
  "/:id",
  [
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuarioDelete
);

module.exports = router;
