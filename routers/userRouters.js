const express = require('express');

const { userRegistration } = require('../controllers/userControllers');
const { loginValidations } = require('../middlewares/userValidations');

const routers = express.Router();
routers.use(express.json());

routers
  .post('/', loginValidations, userRegistration);

module.exports = routers;