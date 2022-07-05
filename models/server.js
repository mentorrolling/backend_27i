const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //middlewares
    this.middleware();

    //rutas
    this.routes();
  }

  middleware() {
    //Public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor online en puerto", this.port);
    });
  }
}

// export default Server //NO SE USA MÁS!!

module.exports = Server;
