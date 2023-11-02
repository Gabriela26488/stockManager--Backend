const { Schema, model, default: mongoose } = require("mongoose");

/* 
  modelo para la base de datos de la coleccion de favoritos
*/
const FavoritoSchema = Schema(
  {
    idUsuario: {
        type: mongoose.ObjectId,
        unique: true,
    },
    idProductos: {
      type: [mongoose.ObjectId],
      default: undefined
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Favoritos", FavoritoSchema);