const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });

    const categories = categoryInfo.map((data) => data.get({ plain: true }));

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });

    const category = await categoryInfo.map((data) =>
      data.get({ plain: true })
    );

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryInfo = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryInfo) {
      res.status(404).json({ message: "No category with this id found"});
      return;
    }

    res.status(200).json(categoryInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
