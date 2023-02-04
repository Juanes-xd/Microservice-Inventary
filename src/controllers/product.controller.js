import { Product } from "../models/Product.js";
import { uploadFile, getFileURL } from "../aws/s3.js";

export const getProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const {
    nombre,
    marca,
    precio,
    imagen,
    id_categoria,
    cantidad,
    descripcion,
    promocion,
  } = req.body;
  try {
    const newProduct = await Product.create({
      nombre,
      marca,
      precio,
      imagen: (await getFileURL(imagen)).toString(),
      id_categoria,
      cantidad,
      descripcion,
      promocion,
    });
    console.log(newProduct.imagen)
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    product.set(req.body);
    const result = await product.save();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.destroy({
      where: {
        id,
      },
    });
    //res.json({ message: "producto eliminado" });
    return res.json({ message: "Producto eliminado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
