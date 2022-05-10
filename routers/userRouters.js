const express = require('express');

const { userRegistration, getUsers } = require('../controllers/userControllers');
const { loginValidations } = require('../middlewares/userValidations');
const { tokenAuth } = require('../middlewares/tokenAuth');

const routers = express.Router();
routers.use(express.json());

routers
  .post('/', loginValidations, userRegistration)
  .get('/', tokenAuth, getUsers);

module.exports = routers;