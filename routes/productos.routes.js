const { Router } = require("express");
const { mostrarProductos, crearProducto, eliminarProducto, editarProducto, mostrarProducto } = require("../controllers/productos.controller");
const { validarCrearProducto, validarEditarProducto } = require("../middlewares/productos.middlewares");


const router = Router();

router.get("/", mostrarProductos);
router.get("/:id", mostrarProducto);

router.post("/", validarCrearProducto,  crearProducto);

router.put("/:id", validarEditarProducto, editarProducto)

router.delete("/:id", eliminarProducto)

module.exports = router;