const { Article } = require("../Models/Article");
const { Categorie } = require("../Models/Categorie");
const fs = require('fs');
const mital = {
  nom: "cc",
  puv: "1",
  image: "blob:http://localhost:5173/4d85fe76-4c7f-450c-8017-daccaefdbc2a",
  stock: "21",
  categorie_id: 44,
  description: "cccc",
};

const createArticle = async (req, res) => {
  try {
    const image_filename = `${req.file.filename}`;
    const articleData = {
      ...req.body, // Spread the body fields
      image: image_filename, // Add the image filename
    };

    // Create the article in the database
    const article = await Article.create(articleData);
    res
      .status(201)
      .json({ success: true, message: "Article a été crées", article });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'article", error });
  }
};

const updatearticle = async (req, res) => {
  const { id } = req.body;
  const image_filename = `${req.file.filename}`;
  const articleData = { ...req.body, image: image_filename };
  try {
    const [updated] = await Article.update(articleData, { where: { id: id }, });
    if (updated) {
      const updatedArticle = await Article.findOne({ where: { id: id } });
      res.status(200).json({ success: true, message: "Article a été modifié" });
    } else {
      res.status(404).json({ success: false, message: "Article non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Erreur lors de la mise à jour de l'article", error });
  }
};

const deleteArticle = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "ID de produit manquant" });
  }

  try {
    const name = await Article.findByPk(productId, { attributes: ["nom", "image"] });
    const deleted = await Article.destroy({
      where: { id: productId },
    });

    if (deleted === 1) {
      fs.unlink(`Uploads/${name.dataValues.nom}`, () => { console.log("deleted") });
      return res
        .status(200)
        .json({ success: true, message: "Article supprimé avec succès" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Article non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erreur interne du serveur", error });
  }
};
const findAll = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['updatedAt', 'DESC']] // Trie par updatedAt dans l'ordre décroissant
    });
    res.status(200).json(articles);
  } catch (error) {
    return { message: "Erreur lors de la récupération des articles" + error };
  }

};

const findProductsRandomlly = async (req, res) => {
  try {
    const products = await Article.findAll();

    let shuffledProducts = [...products];
    for (let i = shuffledProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
    }

    console.log("shuffledProducts", shuffledProducts.map(prod => prod.id));

    res.status(200).json({
      success: true,
      data: shuffledProducts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits aléatoires",
      error: error.message,
    });
  }
};


const findAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['updatedAt', 'DESC']] // Trie par updatedAt dans l'ordre décroissant
    });

    return articles;
  } catch (error) {
    return { message: "Erreur lors de la récupération des articles" + error };
  }
};

const findGroupByGroup = async (req, res) => {
  const { start, limit } = req.query;
  const products = await findAllArticles(); // Remplacez avec votre logique pour récupérer les produits
  try {
    const paginatedProducts = products.slice(Number(start), Number(limit));

    // Utilisation de Promise.all() pour attendre que toutes les catégories soient ajoutées
    const updatedProducts = await Promise.all(
      paginatedProducts.map(async (paginatedProduct) => {
        const categorie = await Categorie.findByPk(paginatedProduct.categorie_id);
        if (categorie) {
          // Créer une copie mutable de l'objet
          return {
            ...paginatedProduct.dataValues,
            categorieName: categorie.nom_categorie, // Ajouter le champ
          };
        }
        return paginatedProduct; // Si aucune catégorie, retourner l'objet original
      })
    );

    res.json({ paginatedProducts: updatedProducts, ProductsNb: products.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOneArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findOne({ where: { id: id } });
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'article", error });
  }
};

module.exports = {
  createArticle,
  updatearticle,
  deleteArticle,
  findGroupByGroup,
  findOneArticle,
  findAllArticles,
  findAll,
  findProductsRandomlly
};
