'use client';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=" w-full bg-orange-100 text-black py-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 font-serif">
              Aroma Sphere
            </h3>
            <p className="text-sm mb-4">
              Discover the art of fragrance with Aroma Sphere, where luxury
              meets nature. Our perfumes are crafted with the finest ingredients
              to captivate your senses.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M22 2.003H2a2 2 0 00-2 2v17.994a2 2 0 002 2h10v-7h-2v-3h2v-2.2a4.4 4.4 0 014.4-4.4c1.25 0 2.4.11 2.4.11v2h-2.3a2.3 2.3 0 00-2.4 2.3v2.7h4.8l-1 3h-3.8v7h7a2 2 0 002-2V4.003a2 2 0 00-2-2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-11h-6v2h6V9zm-3 3h-6v6h6v-6z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-gray-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gray-700">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-700">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <p className="text-gray-900">Email: support@aromasphere.com</p>
              </li>
              <li>
                <p className="text-gray-900">Phone: +1 234 567 890</p>
              </li>
              <li>
                <p className="text-gray-900">
                  Address: 123 Aroma St, Fragrance City
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10 text-sm text-gray-900">
          <p>
            &copy; {new Date().getFullYear()} Aroma Sphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
