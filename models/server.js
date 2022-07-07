const express = require("express");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Conectar DB
    this.conectarDb();

    //middlewares
    this.middleware();

    //rutas
    this.routes();
  }
  //funcion para conectar a DB
  async conectarDb() {
    await dbConnection();
  }

  middleware() {
    //leer el body
    this.app.use(express.json());

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
