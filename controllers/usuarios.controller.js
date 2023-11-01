const mostrarUsuarios = async (req, res) => {
  res.status(200).json({ msg: "mostrar usuarios" });
};

const mostrarUnUsuario = async (req, res) => {
  res.status(200).json({ msg: "mostrar un usuario" });
};

const crearUsuario = async (req, res) => {
  res.status(200).json({ msg: "crear usuario" });
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
