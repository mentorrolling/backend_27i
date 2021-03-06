const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.usuariosPath = "/api/usuarios";
    this.categoriasPath = "/api/categorias";
    this.productosPath = "/api/productos";
    this.buscarPath = "/api/buscar";

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
    //CORS
    this.app.use(cors());

    //leer el body
    this.app.use(express.json());

    //Public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.productosPath, require("../routes/productos"));
    this.app.use(this.buscarPath, require("../routes/buscar"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor online en puerto", this.port);
    });
  }
}

// export default Server //NO SE USA MÁS!!

module.exports = Server;
