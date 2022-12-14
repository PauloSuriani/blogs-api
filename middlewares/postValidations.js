const postValidations = (req, res, next) => {
    const { title, categoryIds, content } = req.body;

    if (!title) {
      return res.status(400).json({
        message: '"title" is required',
      });
    }

    if (!categoryIds) {
      return res.status(400).json({
        message: '"categoryIds" is required',
      });
    }

    if (!content) {
        return res.status(400).json({
          message: '"content" is required',
        });
      }

    next();
};

module.exports = { postValidations };