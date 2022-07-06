const { Router } = require("express");
const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

//POST postear
router.post("/", usuarioPost);

//PUT Actualizar
router.put("/:id", usuarioPut);

//DELETE Borrar
router.delete("/:id", usuarioDelete);

module.exports = router;
