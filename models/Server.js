const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportMiddleware = require("../middlewares/passport");

const dbConnection = require("../db/config.db");
const crearAdmin = require("../libs/initialSetup");

// clase principal para daministrar el sistema
class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.path = {
      auth: "/api/auth",
      productos: "/api/productos",
    };

    this.dataBase();

    this.middlewares();

    this.initialSetup();

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
    passport.use(passportMiddleware);
  }

  // Metodo que establece las configuraciones iniciales
  async initialSetup() {
    await crearAdmin();
  }
  // Metodo que carga las rutas
  routes() {
    this.app.use(this.path.auth, require("../routes/auth.routes"));
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
