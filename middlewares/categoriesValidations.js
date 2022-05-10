const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
});

const categoriesValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: '"name" is required' });
    }
    next();
};

module.exports = {
    categoriesValidation,
};