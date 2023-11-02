const { Router } = require("express");
const {
  mostrarUsuarios,
  mostrarUnUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  verificarLogin,
} = require("../controllers/usuarios.controller");
const { auth, validarCrearCuenta } = require("../middlewares/auth.middlewares");

const router = Router();

router.get("/", auth, mostrarUsuarios);
router.get("/:id", auth, mostrarUnUsuario);
router.post("/", [auth, validarCrearCuenta], crearUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);
router.get("/verificar", verificarLogin);

module.exports = router;
