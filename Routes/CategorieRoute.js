const express = require('express');
const { findAllCategories,getCategorieTree,getNestedCategories, createCategorie} = require('../Controllers/CategorieController.js');

const CategorieRouter = express.Router();

CategorieRouter.get('/', findAllCategories);
CategorieRouter.get('/subcategories/:id', getCategorieTree);
CategorieRouter.get('/nestedCategories', getNestedCategories);
CategorieRouter.post('/add', createCategorie);

module.exports = { CategorieRouter };