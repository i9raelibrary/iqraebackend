const { CommandePack } = require("../Models/CommandePack.js");
const { Client } = require("../Models/Client.js");
const { Article } = require("../Models/Article.js");
const { index } = require("../Models/index.js");
const { Pack } = require("../Models/Pack.js");

const getAllCommandes = async (req, res) => {
  const commandes = await CommandePack.findAll({
    order: [["updatedAt", "DESC"]],
  });
  res.status(200).json({ commandePack: commandes });
};

const insertCommande = async (req, res) => {
  try {
    const { packInfo } = req.body;
    const { userInfo, packId } = packInfo;
    console.log("packInfo : ", packInfo);
    const client = await Client.findOne({ where: { email: userInfo.email } });
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client doesn't exist!" });
    }

    const commandePackage= {
      clientId: client.id,
      packId: packId,
    };
    const newCommande = await CommandePack.create(commandePackage);

    console.log("newCommandePack : ", newCommande);

    res.status(200).json({
      success: true,
      message: "Command inserted successfully!",
     });
     } catch (error) {
    res.status(500).json({
      success: false,
      message: "Command of Package can not be Inserted ! try again please",
      error,
    });
  }
};

const updateCommande = async (req, res) => {
  // il reste de modifier l'etat de la commandePack.status
};

module.exports = {
  getAllCommandes,
  insertCommande,
  updateCommande,
};
