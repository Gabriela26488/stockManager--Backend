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
  agregarFavorito,
} = require("../controllers/productos.controller");
const {
  validarCrearProducto,
  validarEditarProducto,
  cargarImagen,
} = require("../middlewares/productos.middlewares");
const { auth } = require("../middlewares/auth.middlewares");

const router = Router();

/* 
  lista de las rutas utilizadas con sus respectivos middlewares
  y controladores
*/
router.get("/", auth, mostrarProductos);
router.get("/:id", auth, mostrarProducto);
router.get("/buscar/:nombre", auth, buscarProducto);
router.get("/categoria/:categoria", auth, categoriaProducto);
router.post("/", cargarImagen, [auth, validarCrearProducto], crearProducto);
router.put("/:id", [auth, validarEditarProducto], editarProducto);
router.put("/imagen/:id", cargarImagen, editarImagen);
router.delete("/:id", auth, eliminarProducto);
router.get("/agregar/favorito/:id", auth, agregarFavorito);

module.exports = router;
