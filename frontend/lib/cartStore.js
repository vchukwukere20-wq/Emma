import { create } from 'zustand';
import api from './api';

export const useCartStore = create((set) => ({
  items: [],
  totalPrice: 0,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/cart');
      set({ items: response.data.items, totalPrice: response.data.totalPrice, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ isLoading: false });
    }
  },

  addToCart: async (productId, quantity) => {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      set({ items: response.data.cart.items, totalPrice: response.data.cart.totalPrice });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      set({ items: response.data.cart.items, totalPrice: response.data.cart.totalPrice });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  },

  updateCart: async (productId, quantity) => {
    try {
      const response = await api.put(`/cart/update/${productId}`, { quantity });
      set({ items: response.data.cart.items, totalPrice: response.data.cart.totalPrice });
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      await api.delete('/cart/clear');
      set({ items: [], totalPrice: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  },
}));
