const { Router } = require("express");
const {
  mostrarUsuarios,
  mostrarUnUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  verificarLogin,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", mostrarUsuarios);
router.get("/:id", mostrarUnUsuario);
router.post("/", crearUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);
router.get("/verificar", verificarLogin);
