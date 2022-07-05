const { Router } = require("express");

const router = Router();

router.get("/", function (req, res) {
  //req =  res = Response

  res.json({
    msg: "Petición GET - rutas",
  });
});

//POST postear
router.post("/", function (req, res) {
  //req =  res = Response
  res.json({
    msg: "Petición POST - rutas",
  });
});

//PUT Actualizar
router.put("/:id", function (req, res) {
  //req =  res = Response
  const { id } = req.params;
  res.json({
    msg: "Petición PUT - rutas",
    id,
  });
});

//DELETE Borrar
router.delete("/:id", function (req, res) {
  //req =  res = Response
  res.json({
    msg: "Petición DELETE - rutas",
  });
});

module.exports = router;
