const express = require('express');
const { findGroupByGroup, createArticle, updatearticle, deleteArticle, findAll, findProductsRandomlly } = require('../Controllers/ArticleController.js');
const multer = require('multer');
const { checkRoles } = require('../Middlewares/Middlewares.js');
const ArticleRouter = express.Router();

const storage = multer.diskStorage({
    destination: 'Uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage });

ArticleRouter.get('/', findGroupByGroup);
ArticleRouter.get('/findAll',findAll);
ArticleRouter.get('/findRandom', findProductsRandomlly);
ArticleRouter.post('/add', upload.single("image"), createArticle);
ArticleRouter.post('/update', upload.single("image"), updatearticle);
ArticleRouter.post('/delete', deleteArticle);


module.exports = { ArticleRouter };