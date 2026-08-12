import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { useCartStore } from '../lib/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="card hover:shadow-lg transition">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-4 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Link href={`/products/${product._id}`} className="hover:text-blue-600">
        <h3 className="font-bold text-lg mb-2 cursor-pointer">{product.name}</h3>
      </Link>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <FiStar className="text-yellow-400" size={16} />
          <span className="text-sm font-bold">{product.rating || 0}</span>
          <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
        </div>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{product.stock} in stock</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          {product.discountPrice ? (
            <>
              <span className="text-2xl font-bold text-blue-600">₦{product.discountPrice.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through ml-2">₦{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-blue-600">₦{product.price.toLocaleString()}</span>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <FiShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  );
}
