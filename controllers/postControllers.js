const PostServices = require('../services/postServices');

const createNewPost = async (req, res, _next) => {
  try {
    const newPost = await PostServices.createNewPost(req.userId, req.body);

    if (newPost === 'erro') {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
};

const getAllPosts = async (_req, res, next) => {
  try {
    const result = await PostServices.getAllPosts();
    return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
};

const getPostByPK = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await PostServices.getPostByPK(id);

    if (result === 'erro') {
      return res.status(404).json({ message: 'Post does not exist' });
    } 

    return res.status(200).json(result);
  } catch (error) {
      next(error);
  }
  next();
};

const editBlogPost = async (req, res, next) => {
  const userId = req.data.id;
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  console.log('userId do sistema e id dos param', userId, id);
  try {
    if (!categoryIds) {
      return res.status(400).json({ message: 'Error' });
    }
    const result = await PostServices.editBlogPost(userId, id, title, content);
    if (result === 'erro') {
      return res.status(404).json({ message: 'Post does not exist' });
    } 

    return res.status(200).json(result);
  } catch (error) {
      next(error);
  }
  next();
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostByPK,
  editBlogPost,
};