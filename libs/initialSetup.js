// establece las funciones iniciales
const Usuario = require("../models/Usuario");

// funcion para crear un usuario administrador en caso de no existir
const crearAdmin = async () => {
  try {
    const usuarios = await Usuario.find({ rol: "admin" });

    if (usuarios.length > 0) return;

    const newUser = new Usuario({
      correo: "admin@mail.com",
      nombre: "nombreAdmin",
      apellido: "apellidoAdmin",
      password: "12345678",
      telefono: "0000000",
      rol: "admin",
    });

    await newUser.save();
  } catch (e) {
    console.error(e);
  }
};

module.exports = crearAdmin;
