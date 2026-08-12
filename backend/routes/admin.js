const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const totalBuyers = await User.countDocuments({ role: 'buyer' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalSellers,
      totalBuyers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (role) filter.role = role;

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deactivate user
router.put('/users/:userId/deactivate', verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isActive: false },
      { new: true }
    ).select('-password');

    res.json({
      message: 'User deactivated',
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify seller
router.put('/sellers/:sellerId/verify', verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.sellerId,
      { 'sellerInfo.isVerified': true },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Seller verified',
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get('/orders', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const orders = await Order.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('items.product')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
