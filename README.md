# Eemma - Full-Stack E-Commerce Platform

##  Overview

Emma is a modern, full-stack e-commerce platform that connects buyers and sellers. It's designed with scalability and user experience in mind, featuring a robust backend API and an intuitive frontend.

**Live Demo:** Coming soon

##  Key Features

### For Buyers
- 🛍️ Browse and search products with advanced filters
- 🛒 Add items to cart and checkout
- 📦 Track orders in real-time
- ⭐ Rate and review products
- 👤 Manage profile and addresses
- 💳 Multiple payment methods

### For Sellers
- 📊 Manage product listings
- 📈 View sales analytics
- 🎯 Monitor inventory
- 📮 Manage orders and shipments
- ⭐ Build seller ratings

### For Admin
- 👥 User management
- ✅ Seller verification
- 📊 Platform analytics
- 🛡️ Content moderation

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (Next.js)              │
│    React + Tailwind + Zustand           │
└────────────────┬────────────────────────┘
                 │
                 │ HTTP/REST API
                 │
┌────────────────▼────────────────────────┐
│      Backend (Node.js/Express)          │
│  JWT Auth + Mongoose ODM + MongoDB      │
└─────────────────────────────────────────┘
```

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

### Frontend
- **Framework:** Next.js 13+
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Axios
- **UI Components:** Custom + React Icons
- **Notifications:** React Hot Toast

## 📋 MVP Features

✅ User Authentication (Buyers & Sellers)  
✅ Product Listings & Management  
✅ Advanced Search & Filtering  
✅ Shopping Cart  
✅ Checkout Process  
✅ Order Management  
✅ Product Ratings & Reviews  
✅ Admin Dashboard  

## 📁 Project Structure

```
Emma/
├── backend/
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Entry point
│   ├── package.json         # Dependencies
│   ├── .env.example         # Environment template
│   └── README.md            # Backend docs
│
├── frontend/
│   ├── components/          # Reusable React components
│   ├── pages/               # Next.js pages
│   ├── lib/                 # Utilities & API clients
│   ├── styles/              # Global CSS
│   ├── .env.local.example   # Environment template
│   ├── package.json         # Dependencies
│   └── README.md            # Frontend docs
│
└── README.md                # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Start development server:
```bash
npm run dev
```

Backend runs at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Start development server:
```bash
npm run dev
```

Frontend runs at `http://localhost:3000`

## 📚 API Documentation

See [Backend README](./backend/README.md) for complete API documentation.

### Quick API Examples

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123","role":"buyer"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Products:**
```bash
curl http://localhost:5000/api/products?search=phone&limit=10
```

## 🎯 Roadmap

### Phase 1 (MVP) - Current
- [x] User authentication
- [x] Product management
- [x] Shopping cart
- [x] Order management
- [x] Reviews & ratings
- [x] Admin panel basics

### Phase 2
- [ ] Payment integration (Stripe/Paystack)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Seller dashboard
- [ ] Wishlist feature

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Recommendation engine
- [ ] Social features
- [ ] Vendor management
- [ ] Advanced reporting

## 🔐 Security

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Input validation & sanitization
- ✅ Protected API routes
- ✅ Role-based access control

## 📊 Database Schema

### User
- Personal information
- Authentication credentials
- Role (buyer, seller, admin)
- Address & contact info
- Seller-specific fields

### Product
- Name, description, images
- Price & discount
- Stock information
- Category & tags
- Ratings & reviews count
- Seller reference

### Order
- Order items with quantities
- Shipping address
- Payment information
- Status tracking
- Timestamps

### Review
- Rating (1-5)
- Comment & title
- Verified purchase flag
- User reference

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📞 Support

For support, email emmasupport.6@gmail.com or create an issue in the repository.
## Customer support line;
- +2348062670341
  
## 🙏 Acknowledgments

- Inspired by platforms like Jumia, Amazon, and eBay
- Built with modern web technologies
- Community-driven development

---

