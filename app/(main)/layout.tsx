import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <CartProvider>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </CartProvider>
    </>
  );
}
