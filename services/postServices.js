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
      { model: Categories, as: 'categories' },
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  return getPosts;
  };

  const formatResult = (getPost, getUser, getCategory) => {
    const objPost1 = {
      id: getPost.dataValues.id,
      title: getPost.dataValues.title,
      content: getPost.dataValues.content,
      userId: getPost.dataValues.userId,
      published: getPost.dataValues.published,
      updated: getPost.dataValues.updated,
      user: getUser.dataValues,
      categories: [getCategory.dataValues],
    };
    return objPost1;
  };

  const getPostByPK = async (postId) => {
    const getPost = await BlogPosts.findByPk(postId);

    if (!getPost) {
      const erro = 'erro';
      return erro;
    }

    const id = getPost.dataValues.userId;
    // console.log('getUser EM POSTPK', id);
    const getUser = await Users.findByPk(id);
    
    // console.log('getUser de USERS', getUser);

    const idBlogPost = getPost.dataValues.id;
    const getPostCategory = await PostsCategories.findByPk(idBlogPost);
    console.log('GET POST CATEGORY', getPostCategory);

    const categoriesId = getPostCategory.dataValues.categoryId;
    // console.log('CHEGAMOS ONDE QUERÍAMOS CATEGORY', categoriesId);
    const getCategory = await Categories.findByPk(categoriesId);
    // console.log('CHEGAMOS ONDE QUERÍAMOS CATEGORY', getCategory);

    const result = formatResult(getPost, getUser, getCategory);

    console.log('CHEGAMOS ONDE QUERÍAMOS RESULT', result);
    return result;
    };

module.exports = {
    createNewPost,
    getAllPosts,
    getPostByPK,
};

    // {
    //   "id": 1,
    //   "title": "Post do Ano",
    //   "content": "Melhor post do ano",
    //   "userId": 1,
    //   "published": "2011-08-01T19:58:00.000Z",
    //   "updated": "2011-08-01T19:58:51.000Z",
    //   "user": {
    //     "id": 1,
    //     "displayName": "Lewis Hamilton",
    //     "email": "lewishamilton@gmail.com",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    //   },
    //   "categories": [
    //     {
    //       "id": 1,
    //       "name": "Inovação"
    //     }
    //   ]
    // }

    // {
    //   "id": 21,
    //   "title": "Latest updates, August 1st",
    //   "content": "The whole text for the blog post goes here in this key",
    //   "userId": 14, // esse é o id que referência usuário que é o autor do post
    //   "published": "2011-08-01T19:58:00.000Z",
    //   "updated": "2011-08-01T19:58:51.947Z",
    // }

    // {
    //   "id": 1,
    //   "displayName": "Brett Wiltshire",
    //   "email": "brett@email.com", // tem quer ser único
    //   "password": "123456",
    //   "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // }

    // {
    //   "id": 18,
    //   "name": "News"
    // }