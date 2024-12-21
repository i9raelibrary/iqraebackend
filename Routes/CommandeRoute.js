const express = require('express');
const { getAllCommandesWithDetails,InsertCommand, updateCommande} = require('../Controllers/CommandeController.js');
const CommandeRouter = express.Router();

const {checkRoles} = require("../Middlewares/Middlewares.js");

CommandeRouter.get('/', getAllCommandesWithDetails);
CommandeRouter.post('/InsertCommand',InsertCommand);
CommandeRouter.post('/updatecommand',updateCommande);

module.exports = { CommandeRouter };