const { validationResult } = require("express-validator");
const Producto = require("../models/Productos");
const Favorito = require("../models/Favoritos");
const objId = require("mongoose").Types.ObjectId;
const fs = require("fs").promises;

// funcion que valida si se encontraron errores en el express-validator
const validarDatos = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { errors: errors.array() };
  } else return null;
};

// funcion para validar si el id es un id correcto
const validarId = (id) => {
  if (!objId.isValid(id)) {
    return false;
  }
  return true;
};

// controlador que devuelve la lista de productos registrados
const mostrarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// controlador que devuelve un producto en especifico a traves del id
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

// controlador que devuelve un producto en especifico a traves de su nombre
const buscarProducto = async (req, res) => {
  try {
    const buscar = new RegExp(req.params.nombre, "i");

    const busqueda = await Producto.find({ nombre: buscar }).exec();
    res.status(200).json(busqueda);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// controlador que devuelve una lista de productos filtrados por categoria
const categoriaProducto = async (req, res) => {
  try {
    const categoria = req.params.categoria;

    const busqueda = await Producto.find({ categoria: categoria }).exec();
    res.status(200).json(busqueda);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// controlador que se usa para agregar un producto a la bd
const crearProducto = async (req, res) => {
  try {
    if (!ac.can(req.user.rol).createAny("producto").granted)
      return res.status(401).json("Unauthorized");

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

// controlador que se usa para editar un producto de la bd
const editarProducto = async (req, res) => {
  try {
    if (!ac.can(req.user.rol).updateAny("producto").granted)
      return res.status(401).json("Unauthorized");
    if (!validarId(req.params.id))
      return res.status(400).json({ msg: "el id ingresado no es invalido" });

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

// controlador que permite cambiar la imagen de un producto editado
const editarImagen = async (req, res) => {
  if (!ac.can(req.user.rol).updateAny("producto").granted)
    return res.status(401).json("Unauthorized");
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

// controlador que se usa para eliminar un producto de la bd
const eliminarProducto = async (req, res) => {
  try {
    if (!ac.can(req.user.rol).deleteAny("producto").granted)
      return res.status(401).json("Unauthorized");
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

const agregarFavorito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const idProducto = req.params.id;

    if (!validarId(idProducto)) {
      return res.status(400).json({ msg: "el id del producto ingresado no es invalido" });
    }

    const listaUsuariosFavorito = await Favorito.findOne({ idUsuario });

    if (listaUsuariosFavorito) {
      await Favorito.updateOne(
        { idUsuario },
        { $push: { idProductos: idProducto } }
      );
      res.status(200).json({ msg: "Favorito agregado" });
    } else {
      const favorito = new Favorito({ idUsuario, idProductos: [idProducto] });
      await favorito.save();
      res.status(200).json(favorito);
    }
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
  agregarFavorito,
};
