const { body } = require("express-validator");
const Producto = require("../models/Productos");

const validaNombre = async (nombre) => {
  const producto = await Producto.findOne({ nombre });

  if (producto) throw new Error("producto existente");

  return true;
};

const validaNegativo = async (numero) => {
  if (numero > 0) {
		return true;
	}

	throw new Error("la cantidad no debe ser negativa o cero");
};

const verificarCategoria = (categoria) => {
  if (
    categoria === "carniceria" ||
    categoria === "pescaderia" ||
    categoria === "charcuteria" ||
    categoria === "frutas" ||
    categoria === "verduras" ||
    categoria === "bebidas" ||
    categoria === "golosinas" ||
    categoria === "enlatados" ||
    categoria === "viveres" ||
    categoria === "postres"
  ) {
    return true;
  }

  throw new Error("categoría invalida");
};

const validarCrearProducto = [
  body("nombre").exists().withMessage("Nombre es requerido").bail()
    .isString().withMessage("Ingresa un nombre valido").bail()
		.custom(validaNombre),
  body("descripcion").exists().withMessage("descripcion es requerido").bail()
    .isString().withMessage("Ingresa una descripcion valida"),
	body("cantidad").exists().withMessage("cantidad es requerido").bail()
		.isNumeric().withMessage("Ingresa un monto valido").bail()
		.custom(validaNegativo),
	body("precio").exists().withMessage("precio es requerido").bail()
		.isNumeric().withMessage("Ingresa un monto valido").bail()
		.custom(validaNegativo),
	body("categoria").exists().withMessage("categoria es requerido").bail()
	.isString().withMessage("Ingresa una categoria valida").bail()
	.custom(verificarCategoria),
	body("imagen").exists().withMessage("imagen es requerido").bail()
    .isString().withMessage("Ingresa una ruta de imagen valida"),
];

const validarEditarProducto = [
	body("nombre").exists().withMessage("Nombre es requerido").bail()
    .isString().withMessage("Ingresa un nombre valido").bail()
		.custom(async (nombre, { req }) => {
			const producto = await Producto.findOne({nombre});
			const productoEditado = await Producto.findById(req.params.id);
			
			if(producto && productoEditado.nombre !== nombre) throw new Error('nombre existente');

			return true;
		}),
  body("descripcion").optional().bail()
		.isString().withMessage("Ingresa una descripcion valida"),
	body("cantidad").optional().bail()
		.isNumeric().withMessage("Ingresa un monto valido").bail()
		.custom(validaNegativo),
	body("precio").optional().bail()
		.isNumeric().withMessage("Ingresa un monto valido").bail()
		.custom(validaNegativo),
	body("categoria").optional().bail()
		.isString().withMessage("Ingresa una categoria valida").bail()
		.custom(verificarCategoria),
	body("imagen").optional().bail()
		.isString().withMessage("Ingresa una ruta de imagen valida"),
]


module.exports = {
	validarCrearProducto,
	validarEditarProducto
}