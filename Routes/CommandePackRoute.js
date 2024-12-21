const express = require('express');
const { getAllCommandes,insertCommande, updateCommande } = require('../Controllers/CommandePackController.js');
const commandePackRouter = express.Router();
const {checkRoles} = require("../Middlewares/Middlewares");

commandePackRouter.get('/', getAllCommandes);
commandePackRouter.post('/',insertCommande);
commandePackRouter.put('/', checkRoles, updateCommande);

module.exports = { commandePackRouter };