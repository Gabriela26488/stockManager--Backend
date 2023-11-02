const { validationResult } = require("express-validator");
const objId = require("mongoose").Types.ObjectId;
const ac = require("../middlewares/roles");
const Usuario = require("../models/Usuario");

// funcion que valida si se encontraron errores en el express-validator
const validarDatos = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { errors: errors.array() };
  } else return null;
};

// duncion para validar si el id es un id correcto
const validarId = (id) => {
  if (!objId.isValid(id)) {
    return false;
  }
  return true;
};

// funcion que devuelve la lista de usuarios registrados
const mostrarUsuarios = async (req, res) => {
  //   validar si el susuario tiene permisos para acceder a la funcion
  if (!ac.can(req.user.rol).readAny("usuario").granted)
    return  res.status(401).json("Unauthorized");

  try {
    // devuelve la lista de usuarios cuyo estado sea true, es decir, que no esten eliminados.
    const usuarios = await Usuario.find({ estado: true });
    res.status(200).json(usuarios);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// funcion que muestra los datos de un usuario
const mostrarUnUsuario = async (req, res) => {
  // la variable permiso recibe el valor de la validación del permiso
  const permiso = ac.can(req.user.rol).readAny("usuario");
  // idValido recibe la validación del id
  const idValido = validarId(req.params.id);

  if (!permiso.granted)
    return  res.status(401).json("Unauthorized");
  if (!idValido) return res.status(401).json({ msg: "El id es incorrecto" });

  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(400).json({ msg: "Usuario no registrado" });
    res.status(200).json(usuario);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// funcion para crear usuario
const crearUsuario = async (req, res) => {
  if (!ac.can(req.user.rol).createAny("usuario").granted)
    return  res.status(401).json("Unauthorized");

  try {
    const validar = validarDatos(req);
    if (validar) return res.status(400).json(validar);

    const nuevoUsuario = new Usuario(req.body);

    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const editarUsuario = async (req, res) => {
  res.status(200).json({ msg: "editar usuario" });
};

const eliminarUsuario = async (req, res) => {
  res.status(200).json({ msg: "eliminar usuario" });
};

const verificarLogin = async (req, res) => {
  res.status(200).json({ msg: "verificar login" });
};

module.exports = {
  mostrarUsuarios,
  mostrarUnUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  verificarLogin,
};
