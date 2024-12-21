const express = require('express');
const PackRouter = express.Router();
const { addPack, getPacks, deletePack } = require('../Controllers/PackController.js');

PackRouter.post('/add', addPack);
PackRouter.get('/', getPacks);
PackRouter.post('/delete', deletePack);


module.exports = { PackRouter };