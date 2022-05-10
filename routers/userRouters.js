const express = require('express');

const { userRegistration, getUsers, getUserByPK } = require('../controllers/userControllers');
const { loginValidations } = require('../middlewares/userValidations');
const { tokenAuth } = require('../middlewares/tokenAuth');

const routers = express.Router();
routers.use(express.json());

routers.post('/', loginValidations, userRegistration);
routers.get('/', tokenAuth, getUsers);
routers.get('/:id', tokenAuth, getUserByPK);

module.exports = routers;