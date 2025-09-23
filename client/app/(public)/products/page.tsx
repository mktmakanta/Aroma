import Footer from '@/app/components/Footer';
import Newsletter from '../../components/NewsLetter';
import ProductsPage from '../../components/ProductsPage';
import Hero from '../../components/Hero';

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ProductsPage />
      <Newsletter />
      <Footer />
    </main>
  );
}
