const { Router } = require("express");
const {
  mostrarUsuarios,
  mostrarUnUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  verificarLogin,
} = require("../controllers/usuarios.controller");
const { auth, validarCrearCuenta, validarEditarCuenta } = require("../middlewares/auth.middlewares");

const router = Router();

router.get("/", auth, mostrarUsuarios);
router.get("/:id", auth, mostrarUnUsuario);
router.post("/", [auth, validarCrearCuenta], crearUsuario);
router.put("/:id", [auth, validarEditarCuenta], editarUsuario);
router.delete("/:id", auth, eliminarUsuario);
router.get("/verificar/usuario", auth, verificarLogin);

module.exports = router;
