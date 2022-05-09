const express = require('express');

const { userLogin } = require('../controllers/loginControllers');
const { emailValidations, loginValidations } = require('../middlewares/userValidations');

const routers = express.Router();
routers.use(express.json());

routers
  .post('/', emailValidations, loginValidations, userLogin);

module.exports = routers;