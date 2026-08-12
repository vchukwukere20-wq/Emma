const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create review
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { productId, orderId, rating, title, comment } = req.body;

    if (!productId || !orderId || !rating || !title || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Verify order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order || order.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user.id,
      order: orderId,
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const review = new Review({
      product: productId,
      user: req.user.id,
      order: orderId,
      rating,
      title,
      comment,
    });

    await review.save();

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating.toFixed(1),
      reviewCount: reviews.length,
    });

    res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product reviews
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'firstName lastName profileImage')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update review
router.put('/:reviewId', verifyToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(review, req.body);
    review.updatedAt = Date.now();

    await review.save();

    res.json({
      message: 'Review updated successfully',
      review,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete review
router.delete('/:reviewId', verifyToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const productId = review.product;
    await Review.findByIdAndDelete(req.params.reviewId);

    // Update product rating
    const reviews = await Review.find({ product: productId });
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Product.findByIdAndUpdate(productId, {
        rating: avgRating.toFixed(1),
        reviewCount: reviews.length,
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        rating: 0,
        reviewCount: 0,
      });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
