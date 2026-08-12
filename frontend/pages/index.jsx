import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import ProductCard from '../components/ProductCard';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?limit=8');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-main text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Emma</h1>
          <p className="text-xl mb-8">Your trusted marketplace for buying and selling quality products</p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/register?role=seller" className="btn-secondary text-blue-600">
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-main">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            View All <FiArrowRight size={20} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card h-80 bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16 mt-12">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Emma?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Safe and encrypted payment methods</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Verified sellers with excellent ratings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
