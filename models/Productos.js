const { Schema, model } = require("mongoose");

const ProductoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      lowercase: true,
    },
    descripcion: {
      type: String,
      required: true,
      lowercase: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    categoria: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Productos", ProductoSchema);
