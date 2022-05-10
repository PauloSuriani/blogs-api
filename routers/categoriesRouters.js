const express = require('express');

const { createCategories, getCategories } = require('../controllers/categoriesControllers');
const { categoriesValidation } = require('../middlewares/categoriesValidations');
const { tokenAuth } = require('../middlewares/tokenAuth');

const routers = express.Router();
routers.use(express.json());

routers
  .post('/', tokenAuth, categoriesValidation, createCategories)
  .get('/', tokenAuth, getCategories);

module.exports = routers;