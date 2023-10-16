const express = require("express");
const cors = require("cors");

const dbConnection = require("../db/config.db");

// clase principal para daministrar el sistema
class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.path = {
      productos: "/api/productos",
    };

    this.dataBase();

    this.routes();

    this.listen();
  }

  async dataBase() {
    await dbConnection();
  }

  // Metodo que establece los middlewares
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.path.productos, require("../routes/productos.routes"));
  }

  // metodo que arranca el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log("corriendo en el puerto: " + this.port);
    });
  }
}

module.exports = Server;
