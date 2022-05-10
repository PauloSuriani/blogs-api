const CategoriesServices = require('../services/categoriesServices');

const { HTTP_CREATED } = require('../httpStatusProtocols');

const createCategories = async (req, res, _next) => {
  try {
    const newToken = await CategoriesServices.createCategories(req.body);

    if (newToken === 'Invalid fields') {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    
    return res.status(HTTP_CREATED).json(newToken);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
};

const getCategories = async (_req, res, _next) => {
    try {
      const newToken = await CategoriesServices.getCategories();
      return res.status(200).json(newToken);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid Categories search' });
    }
  };

module.exports = { createCategories, getCategories };