import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";
import { Categoria } from "./categoria.js";

export const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.INTEGER,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
    },
    cantidad: {
      type: DataTypes.INTEGER,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    promocion: {
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: true }
);

Categoria.hasMany(Product, {
  foreignKey: "id_categoria",
});

Product.belongsTo(Categoria, {
  foreignKey: "id_categoria",
});
