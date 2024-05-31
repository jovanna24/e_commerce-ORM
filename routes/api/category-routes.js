const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products 
  try{
    const categoriesData = await Category.findAll({
      include: [{model: Product}]
    }); 
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products 
  try{
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 
        'category_products'
      }]
    });
    if (!categoriesData) {
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create(req.body); 
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id, 
      }, 
    });
    if (!categoriesData[0]) {
      res.status(404).json({message: 'No category with this id!'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoriesData) {
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
