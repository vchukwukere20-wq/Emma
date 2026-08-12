import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../lib/authStore';
import api from '../lib/api';
import Link from 'next/link';
import { FiBox, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchOrders();
    }
  }, [user, router]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="container-main">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 btn-secondary">
          <FiLogOut size={18} />
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="card mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">👤</div>
          <div>
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 capitalize">Account Type: {user.role}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/products" className="card text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="font-bold text-lg mb-2">Continue Shopping</h3>
          <p className="text-gray-600 text-sm">Browse our products</p>
        </Link>

        <Link href="/cart" className="card text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="font-bold text-lg mb-2">My Cart</h3>
          <p className="text-gray-600 text-sm">View your shopping cart</p>
        </Link>

        <Link href="/profile" className="card text-center hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="font-bold text-lg mb-2">My Profile</h3>
          <p className="text-gray-600 text-sm">Edit your information</p>
        </Link>
      </div>

      {/* Orders */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3">Order ID</th>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 font-bold">{order.orderNumber}</td>
                    <td className="py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 font-bold">₦{order.totalAmount.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <Link href={`/orders/${order._id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">No orders yet</p>
            <Link href="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
