import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../lib/authStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}
