import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCartStore } from '../lib/cartStore';
import { useAuthStore } from '../lib/authStore';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, totalPrice, fetchCart, removeFromCart, updateCart, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchCart();
    }
  }, [user, router, fetchCart]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCart(productId, quantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (!user) return null;

  return (
    <div className="container-main">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.length > 0 ? (
            <div className="card">
              {items.map((item) => (
                <div key={item.product._id} className="flex gap-6 py-6 border-b last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.product.description.substring(0, 100)}...</p>
                    <p className="font-bold text-blue-600">₦{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <h2 className="text-2xl font-bold text-gray-500 mb-4">Your cart is empty</h2>
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="card h-fit">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Link href="/checkout" className="w-full btn-primary block text-center mb-3">
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full btn-secondary"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
