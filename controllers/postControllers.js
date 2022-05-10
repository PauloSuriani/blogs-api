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

const getPostByPK = async (req, res, next) => {
  // console.log('getokokokok', req.params.id);
  const { id } = req.params;
  try {
    const result = await PostServices.getPostByPK(id);
    console.log('eutoloko!', result);

    if (result === 'erro') {
      return res.status(404).json({ message: 'Post does not exist' });
    } 

    return res.status(200).json(result);
  } catch (error) {
      next(error);
  }
  // try {
  //     const result = await PostServices.getPostByPK(req.body);
  
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // return res.status(200).json(result);

  next();
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostByPK,
};