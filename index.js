// import React from 'react' //NO SE USA MÁS!!!

// const express = require("express"); //AHORA ES ASÍ

const Server = require("./models/server");

require("dotenv").config(); //Importando la config. de dotenv

const server = new Server();

server.listen();

// const app = express();

// app.get("/", function (req, res) {
//   //req =  res = Response
//   res.json({
//     msg: "Hola mundo!!",
//   });
// });

// app.listen(process.env.PORT, () => {
//   console.log("Servidor online en puerto", process.env.PORT);
// });
