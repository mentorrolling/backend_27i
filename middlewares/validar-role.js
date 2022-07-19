const esAdminRole = (req, res, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "se quiere verificar el rol sin validar el token",
    });
  }

  const { role, nombre } = req.usuario;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }

  next();
};

module.exports = {
  esAdminRole,
};
