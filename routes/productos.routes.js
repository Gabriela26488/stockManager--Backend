const { Router } = require("express");
const { mostrarProductos, crearProducto } = require("../controllers/productos.controller");
const { validarCrearProducto } = require("../middlewares/productos.middlewares");


const router = Router();

router.get("/", mostrarProductos);

router.post("/", validarCrearProducto,  crearProducto);

router.put("/:id", (req, res) => {
    res.json({msg: "editar producto"});
})

router.delete("/", (req, res) => {
    res.json({msg: "eliminar producto"});
})

module.exports = router;