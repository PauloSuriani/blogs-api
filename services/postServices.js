const { Users, Categories, BlogPosts, PostsCategories } = require('../models');
// const postscategories = require('../models/postscategories');
// const error = require('../util/error');

const createNewPost = async (userId, { title, categoryIds, content }) => {
    const categories = await Categories.findAll();
    const idSearch = categories.map((id) => id.dataValues.id);
    const categoryCheck = categoryIds.every((catId) => idSearch.includes(catId));

    if (!categoryCheck) {
      const erro = 'erro';
      return erro;
    }
         
    const db = await BlogPosts.create({ title, content, userId, categoryIds });
    categoryIds.map(async (category) => {
        await PostsCategories.create({ postId: db.dataValues.id, categoryId: category });
    });

    console.log(db.dataValues);
    const objReturn = { id: db.dataValues.id, 
      userId: db.dataValues.userId, 
      title: db.dataValues.title, 
      content: db.dataValues.content,
    };
    return objReturn;
};

const getAllPosts = async () => {
    const getPosts = await BlogPosts.findAll({ 
      include: [
        { model: Users,
        as: 'users',
        attributes: { exclude: ['password'] } },
        { model: Categories,
        as: 'categories',
        through: { attributes: [] },
      },
      {
        model: Categories,
        as: 'categories',
        through: { attributes: [] },
      },
      ],
    });
  
    return getPosts;
  };

module.exports = {
    createNewPost,
    getAllPosts,
};