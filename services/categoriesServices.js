const { Categories } = require('../models');

const createCategories = async (body) => Categories.create(body);

const getCategories = async () => Categories.findAll();

module.exports = { createCategories, getCategories };