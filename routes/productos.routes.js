const { Router } = require("express");
const {
  mostrarProductos,
  crearProducto,
  eliminarProducto,
  editarProducto,
  mostrarProducto,
  editarImagen,
  buscarProducto,
  categoriaProducto,
} = require("../controllers/productos.controller");
const {
  validarCrearProducto,
  validarEditarProducto,
  cargarImagen,
} = require("../middlewares/productos.middlewares");

const router = Router();

router.get("/", mostrarProductos);
router.get("/:id", mostrarProducto);
router.get("/buscar/:nombre", buscarProducto);
router.get("/categoria/:categoria", categoriaProducto);

router.post("/", cargarImagen, validarCrearProducto, crearProducto);

router.put("/:id", validarEditarProducto, editarProducto);
router.put("/imagen/:id", cargarImagen, editarImagen);

router.delete("/:id", eliminarProducto);

module.exports = router;
