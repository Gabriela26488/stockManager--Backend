const { Router } = require("express");
const {
  mostrarProductos,
  crearProducto,
  eliminarProducto,
  editarProducto,
  mostrarProducto,
  editarImagen,
} = require("../controllers/productos.controller");
const {
  validarCrearProducto,
  validarEditarProducto,
  cargarImagen,
} = require("../middlewares/productos.middlewares");

const router = Router();

router.get("/", mostrarProductos);
router.get("/:id", mostrarProducto);

router.post("/", cargarImagen, validarCrearProducto, crearProducto);

router.put("/:id", validarEditarProducto, editarProducto);
router.put("/imagen/:id", cargarImagen, editarImagen);

router.delete("/:id", eliminarProducto);

module.exports = router;
