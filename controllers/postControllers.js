const PostServices = require('../services/postServices');

const createNewPost = async (req, res, _next) => {
  try {
    const newPost = await PostServices.createNewPost(req.userId, req.body);
    if (newPost === 'erro') {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    return res.status(201).json(newPost);
  } catch (error) {
    console.log('postControllers catch: ', error);
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

module.exports = {
  createNewPost,
  getAllPosts,
};