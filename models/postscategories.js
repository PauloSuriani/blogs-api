const BlogPosts = (models, through) => {
  models.BlogPosts.belongsToMany(models.Categories, {
    as: 'categories',
    through,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};

const Categories = (models, through) => {
  models.Categories.belongsToMany(models.BlogPosts, {
    as: 'posts',
    through,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', 
  // { postId: { type: DataTypes.INTEGER } },
  {},
   { timestamps: false, modelName: 'PostsCategories' });

  PostsCategories.associate = (models) => {
    Categories(models, PostsCategories);
    BlogPosts(models, PostsCategories);
  };

  return PostsCategories;
};