const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
const Category = require("../models/Category.js");

// Yeni bir  ürün oluşturma(Create)
router.post("/", async (req, res) => {
  try {
    const product = req.body;

    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm ürünleri getirme(readall)

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Belirli bir ürünü getirme (Read - Single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürün güncelleme(update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Kategori silme (delete)
// Remove kullanılıyor ama Delete kullanmak zorundayız Remove Kaldırılmış
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/search/:productName",async (req,res)=>{

  try{
    const productName = req.params.productName;
    const products = await Product.find({name:{$regex:productName,$options:"i"}})
    res.status(200).json(products)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
})

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Product.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
module.exports = router;
