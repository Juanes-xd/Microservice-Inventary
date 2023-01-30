import { Categoria } from "../models/categoria.js";
import { Product } from "../models/Product.js";

export const getProductsCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findOne({
      where: {
        id_categoria: id,
      },
    });
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    const newCategory = await Categoria.create({
      nombre,
    });
    res.json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findOne({
      where: {
        id,
      },
    });
    res.json(categoria);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findOne({
      where: {
        id,
      },
    });
    categoria.set(req.body);
    await categoria.save();
    return res.json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Categoria.destroy({
      where: {
        id,
      },
    });
    res.json(result);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
