const express = require('express');

const { createNewPost, getAllPosts } = require('../controllers/postControllers');
const { postValidations } = require('../middlewares/postValidations');
const { tokenAuth } = require('../middlewares/tokenAuth');

const routers = express.Router();
routers.use(express.json());

routers
  .post('/', tokenAuth, postValidations, createNewPost)
  .get('/', tokenAuth, getAllPosts);
//   .get('/', tokenAuth, getCategories);

module.exports = routers;