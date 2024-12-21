const { Pack } = require('../Models/Pack.js');
const { Article } = require('../Models/Article.js');
const { where } = require('sequelize');
const { raw } = require('mysql');


const addPack = async (req, res) => {
    const produits = req.body.Info.id;
    const nom = req.body.Info.Info.Name;
    const prixTotal = req.body.Info.Info.price;
    const description = req.body.Info.Info.Descreption;
    const oldPrix = req.body.Info.Info.Total;
    try {
        if (!Array.isArray(produits)) {
            return res.status(400).json({ success: false, message: '`produits` must be an array' });
        }
        const pack = await Pack.create({ nom: nom, produits: produits, prixTotal: prixTotal, description: description, oldPrix: oldPrix });
        if (pack) {
            res.status(201).json({ success: true, message: 'Pack created successfully', data: pack });
        } else {
            res.status(501).json({ success: false, message: 'Pack is not created ' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error in creating package!" })
    }

}

const getPacks = async (req, res) => {
    try {
        const packs = await Pack.findAll({ raw: true });
        console.log(packs);
        const results = [];

        for (const pack of packs) {
            const newProduits = [];
            const produits = pack.produits;

            for (const pro of produits) {
                const article = await Article.findByPk(pro, { attributes: ['nom', 'image'], raw: true });

                if (article) {
                    newProduits.push({
                        item: pro,
                        nom: article.nom,
                        image: article.image,
                    });
                }
            }
            results.push({
                pack,
                produits: newProduits,
            });
        }
        console.log("produits =>", results[0].produits);
        res.status(200).json({ success: true, results }); // Send the final response
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while fetching packs." });
    }
};


const deletePack = async (req, res) => {
    try {
        const { id } = req.body; // Extract the pack ID from the request body


        if (!id) {
            return res.status(400).json({ success: false, message: "Pack ID is required" });
        }

        // Attempt to find and delete the pack by ID
        const deletedPack = await Pack.destroy({
            where: { id: id }
        });

        if (deletedPack === 0) {
            return res.status(404).json({ success: false, message: "Pack not found" });
        }

        res.status(200).json({ success: true, message: "Pack deleted successfully" });
    } catch (error) {
        console.error("Error deleting pack:", error);
        res.status(500).json({ success: false, message: "An error occurred while deleting the pack" });
    }
};




module.exports = { addPack, getPacks, deletePack }