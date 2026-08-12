# Emma Frontend

Modern e-commerce frontend built with Next.js

## 🚀 Getting Started

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend API URL

### Running the Application

**Development:**
```bash
npm run dev
```

The application will start at `http://localhost:3000`

**Production:**
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
frontend/
├── components/          # Reusable components
├── lib/                 # Utilities and API clients
├── pages/               # Next.js pages
├── styles/              # Global styles
├── .env.local.example   # Environment variables template
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies
```

## 📄 Pages

- **`/`** - Home page with featured products
- **`/products`** - Product listing with search and filters
- **`/login`** - User login page
- **`/register`** - User registration page
- **`/cart`** - Shopping cart
- **`/dashboard`** - User dashboard with orders

## 🛠️ Technologies

- Next.js 13+ - React framework
- Tailwind CSS - Utility-first CSS
- Zustand - State management
- Axios - HTTP client
- React Hot Toast - Notifications
- React Icons - Icon library

## 🔐 Authentication

The app uses JWT tokens stored in localStorage for authentication. Tokens are automatically added to API requests via axios interceptors.

## 🎨 Components

- **Navbar** - Navigation header with user menu
- **Footer** - Footer with links
- **ProductCard** - Individual product display

## 📝 State Management

The app uses Zustand for global state:
- `useAuthStore` - User authentication and profile
- `useCartStore` - Shopping cart management

## 🚀 Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Or deploy to other platforms by building and pushing:

```bash
npm run build
```

## 📄 License

MIT
