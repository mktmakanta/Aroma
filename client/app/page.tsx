import Hero from './components/Hero';
import Newsletter from './components/NewsLetter';
import ProductsPage from './components/ProductsPage';

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ProductsPage />
      <Newsletter />
    </main>
  );
}
