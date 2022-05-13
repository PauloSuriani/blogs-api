const { Users, Categories, BlogPosts, PostsCategories } = require('../models');

const categoryCheck = async (categoryIds, idSearch) => {
  const categoryCheckUp = categoryIds.map((catId) => {
    if (idSearch.includes(catId)) {
      return true;
    }
    return false;
  });
  return categoryCheckUp;
};

const createNewPost = async (userId, { title, categoryIds, content }) => {
    const categories = await Categories.findAll();
    const idSearch = categories.map((id) => id.dataValues.id);
    const catCheckBeforeAddToBlog = await categoryCheck(categoryIds, idSearch);

    if (catCheckBeforeAddToBlog.includes(false)) {
      const erro = 'erro';
      return erro;
    }
         
    const db = await BlogPosts.create({ title, content, userId, categoryIds });
    categoryIds.map(async (newCategory) => {
        await PostsCategories.create({ postId: db.dataValues.id, categoryId: newCategory });
    });

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
      { model: Users, as: 'user' },
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
  const getUser = await Users.findByPk(id);

  const idBlogPost = getPost.dataValues.id;
  const getPostCategory = await PostsCategories.findByPk(idBlogPost);

  const categoriesId = getPostCategory.dataValues.categoryId;
  const getCategory = await Categories.findByPk(categoriesId);

  const result = formatResult(getPost, getUser, getCategory);
  return result;
};

const editBlogPost = async (user, id, title, content) => {
  await BlogPosts.update({ title, content }, 
    { where: { userID: user, id } });

  const updatedPost = await BlogPosts.findOne({ where: { id },
    include: [
      { model: Categories, as: 'categories' },
      { model: Users, as: 'user' },
    ],
  });

  return updatedPost;
  };

module.exports = {
    createNewPost,
    getAllPosts,
    getPostByPK,
    editBlogPost,
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