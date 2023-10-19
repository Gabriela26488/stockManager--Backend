const { validationResult } = require("express-validator");
const Producto = require("../models/Productos");
const objId = require("mongoose").Types.ObjectId;
const fs = require("fs").promises;

// funcion que valida si se encontraron errores en el express-validator
const validarDatos = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { errors: errors.array() };
  } else return null;
};

const validarId = (id) => {
  if (!objId.isValid(id)) {
    return false;
  }
  return true;
};

const mostrarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const mostrarProducto = async (req, res) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({ msg: "el id ingresado no es invalido" });
    }

    const verificaExistencia = await Producto.findById(req.params.id);

    if (!verificaExistencia) {
      return res
        .status(400)
        .json({ msg: "el producto no se encuentra registrado" });
    }

    const producto = await Producto.findById(req.params.id);
    res.status(200).json(producto);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const buscarProducto = async (req, res) => {

  try {
    const nombre = req.params.nombre;
    
    const busqueda = await Producto.find({nombre: nombre}).exec();
    res.status(200).json(busqueda);
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

}

const categoriaProducto = async (req, res) => {

  try {
    const categoria = req.params.categoria;
    
    const busqueda = await Producto.find({categoria: categoria}).exec();
    res.status(200).json(busqueda);
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

}

const crearProducto = async (req, res) => {
  try {
    const validar = validarDatos(req);
    if (validar) {
      await fs.unlink(`./${req.file.destination}/${req.file.filename}`);
      return res.status(400).json(validar);
    }

    req.body.imagen = `/images/productos/${req.file.filename}`;

    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const editarProducto = async (req, res) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({ msg: "el id ingresado no es invalido" });
    }
    const verificaExistencia = await Producto.findById(req.params.id);

    if (!verificaExistencia) {
      return res
        .status(400)
        .json({ msg: "el producto no se encuentra registrado" });
    }

    const validar = validarDatos(req);
    if (validar) return res.status(400).json(validar);

    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({ msg: "Producto actualizado", actualizado });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const editarImagen = async (req, res) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({ msg: "el id ingresado no es invalido" });
    }
    const verificaExistencia = await Producto.findById(req.params.id);

    if (!verificaExistencia) {
      return res
        .status(400)
        .json({ msg: "el producto no se encuentra registrado" });
    }
    
    const imagen = `/images/productos/${req.file.filename}`;
    const update = await Producto.findByIdAndUpdate(
      req.params.id,
      { imagen: imagen },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Imagen del producto actualizada", update });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.reason.toString());
  }
};

const eliminarProducto = async (req, res) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({ msg: "el id ingresado no es invalido" });
    }

    const verificaExistencia = await Producto.findById(req.params.id);

    if (!verificaExistencia) {
      return res
        .status(400)
        .json({ msg: "el producto no se encuentra registrado" });
    }

    await Producto.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ msg: "el producto ha sido eliminado correctamente" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
  mostrarProductos,
  mostrarProducto,
  crearProducto,
  editarProducto,
  editarImagen,
  eliminarProducto,
  buscarProducto,
  categoriaProducto,
};
