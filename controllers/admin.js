const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.post("/post", (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.body.userId,
  });
  product.save().then((result) => {
    console.log("inserterd");
    res.redirect("/admin/get");
  });
});
//populate
router.get("/get", (req, res, next) => {
  Product.find()
    .populate("userId")
    .then((result) => {
      res.send(result);
    });
});
//id = 6596ac1c444a0cbf0372454d
router.get("/get/:productId", (req, res, next) => {
  Product.findById(req.params.productId).then((result) => res.send(result));
});
//Update
router.post("/edit", (req, res, next) => {
  const price = req.body.price;

  Product.findById("6596ac1c444a0cbf0372454d")
    .then((product) => {
      product.price = price;
      return product.save();
    })
    .then((result) => res.send(result));
});
//Delete
router.delete("/delete", (req, res, next) => {
  Product.findByIdAndDelete("6596ac1c444a0cbf0372454d").then((product) => {
    res.send("deleted");
  });
});

module.exports = router;
