# Emma Backend API

Emma is an e-commerce platform backend built with Node.js and Express.

## 🚀 Getting Started

### Prerequisites
- Node.js v16 or higher
- MongoDB

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

### Running the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile (requires token)
- `GET /api/users/seller/:sellerId` - Get seller profile
- `PUT /api/users/seller/update` - Update seller info (requires token)

### Products
- `GET /api/products` - Get all products (with search, filters, pagination)
- `GET /api/products/:productId` - Get single product
- `POST /api/products/create` - Create product (seller only)
- `PUT /api/products/:productId` - Update product (seller only)
- `DELETE /api/products/:productId` - Delete product (seller only)
- `GET /api/products/seller/:sellerId` - Get seller products

### Cart
- `GET /api/cart` - Get user cart (requires token)
- `POST /api/cart/add` - Add to cart (requires token)
- `DELETE /api/cart/remove/:productId` - Remove from cart (requires token)
- `PUT /api/cart/update/:productId` - Update cart item (requires token)
- `DELETE /api/cart/clear` - Clear cart (requires token)

### Orders
- `POST /api/orders/create` - Create order (requires token)
- `GET /api/orders` - Get user orders (requires token)
- `GET /api/orders/:orderId` - Get single order (requires token)
- `PUT /api/orders/:orderId/status` - Update order status (seller/admin only)
- `GET /api/orders/seller/orders` - Get seller orders (requires token)

### Reviews
- `POST /api/reviews/create` - Create review (requires token)
- `GET /api/reviews/product/:productId` - Get product reviews
- `PUT /api/reviews/:reviewId` - Update review (requires token)
- `DELETE /api/reviews/:reviewId` - Delete review (requires token)

### Admin
- `GET /api/admin/stats` - Get dashboard stats (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:userId/deactivate` - Deactivate user (admin only)
- `PUT /api/admin/sellers/:sellerId/verify` - Verify seller (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📁 Project Structure

```
backend/
├── models/           # Mongoose schemas
├── routes/           # API routes
├── middleware/       # Custom middleware
├── .env.example      # Environment variables template
├── server.js         # Main server file
├── package.json      # Dependencies
└── README.md         # This file
```

## 🗄️ Database Models

- **User** - Buyer, Seller, Admin
- **Product** - Product listings
- **Cart** - Shopping cart
- **Order** - Orders
- **Review** - Product reviews

## 📝 Environment Variables

See `.env.example` for all available configuration options.

## 🛠️ Technologies

- Express.js - Web framework
- Mongoose - MongoDB ODM
- JWT - Authentication
- Bcryptjs - Password hashing
- CORS - Cross-origin requests

## 📄 License

MIT
