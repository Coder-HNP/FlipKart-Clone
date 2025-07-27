// server/routes/cart.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Middleware to protect routes
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
}

// GET user cart
router.get('/', authenticate, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.product');
  res.json(cart || { items: [] });
});

// ADD to cart
router.post('/add', authenticate, async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    cart = new Cart({ userId: req.user.userId, items: [] });
  }

  const index = cart.items.findIndex(i => i.product.toString() === productId);
  if (index >= 0) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({ product: productId, quantity: 1 });
  }

  await cart.save();
  res.send("Added to cart");
});

// REMOVE item
router.delete('/remove/:productId', authenticate, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.userId });
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  res.send("Removed from cart");
});

module.exports = router;
