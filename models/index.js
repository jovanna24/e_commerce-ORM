// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { castArray } = require('lodash');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey:'category_id', 
  as: 'category', 
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey:'category_id', 
  as: 'products',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag, 
    unique: false
  }, 
  as: 'tags',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag, 
    unique: false
  }, 
  as: 'products',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
