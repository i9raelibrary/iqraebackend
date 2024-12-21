const { Categorie } = require('../Models/Categorie');

const findAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des categories  ' + error });
    }
};

const hasChilds = (categorie, population) => {
    try {
        const childs = population.filter(cat => cat.parent_id === categorie.id);

        return childs;
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des categories  ' + error });
    }
};

const getAllChildsCategs = (categorie, population) => {
    const childs = hasChilds(categorie, population);
    const tree = [];
    for (const child of childs) {
        tree.push({
            ...child.dataValues,
            children: getAllChildsCategs(child, population),
        });
    }

    return tree;
};

const getCategorieTree = async (req, res) => {
    try {
        const { id } = req.params;

        const categories = await Categorie.findAll();

        const categorie = await Categorie.findByPk(id);

        if (!categorie) {
            return res.status(404).json({ message: "Catégorie introuvable" });
        }

        const tree = {
            ...categorie.dataValues,
            children: getAllChildsCategs(categorie, categories),
        };

        res.status(200).json(tree);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des catégories", error });
    }
};

const getNestedCategories = async (req, res) => {
    try {
        // const [categs, setCategs] = useState([]);
        const categories = await Categorie.findAll();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "Catégorie introuvable" });
        }

        const nestedCategories = categories
            .filter(categ => !categ.parent_id) // Filtrer les catégories racines (sans parentId)
            .map(rootCategory => ({
                ...rootCategory.dataValues,
                children: getAllChildsCategs(rootCategory, categories),
            }));

        res.status(200).json(nestedCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des catégories", error });
    }
};

const createCategorie = async (req, res) => {
    const CategorieData = {
      ...req.body, // Spread the body fields
    };
    
    const categorie = {
        nom_categorie: CategorieData.catName,
        maxOrdStock: CategorieData.maxOrdStack,
        LivraisonPrice: CategorieData.LivraisonPrice,
        parent_id: CategorieData.CatparentId,
    }
    console.log('data',categorie)
    try {

      const oneCategorie = await Categorie.create(categorie);
      res
        .status(201)
        .json({ success: true, message: "Categorie a été crées", oneCategorie });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création de categorie", error });
    }
  };

module.exports = {
    findAllCategories,
    getCategorieTree,
    getNestedCategories,
    createCategorie
}