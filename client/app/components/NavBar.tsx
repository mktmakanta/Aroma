'use client';

import Link from 'next/link';
import { Gem, ShoppingCart } from 'lucide-react';
import { CurrentUserStatus } from './CurrentUserStatus';

const Navbar = () => {
  return (
    <nav className=" w-full bg-orange-100 flex sticky top-0 z-10 justify-center">
      <div className="w-full   mx-auto border-b  p-4 md:p-6 sm:px-5 lg:px-16 ">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-black text-lg font-medium font-serif lg:text-2xl flex gap-3 items-center"
            >
              <Gem className="size-6" />
              <span className="text-sm hidden md:flex"> Aroma De Royal</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 font-geist">
            <ul className="flex space-x-8 font-mono text-sm font-medium  ">
              <li className="cursor-pointer hover:text-orange-400">Home</li>
              <li className="cursor-pointer hover:text-orange-400">About</li>
              <li className="cursor-pointer hover:text-orange-400">Contact</li>
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-5 items-center">
            <Link
              href="/cart"
              className="text-black hover:text-red-600 transition-all duration-100 flex "
            >
              <ShoppingCart />
            </Link>
            <CurrentUserStatus />
          </div>
        </div>
      </div>

      {/* // Mobile */}
      <div className="md:hidden flex  space-x-3 items-center px-4">
        <Link href="/cart" className=" text-black hover:text-red-600  ">
          <ShoppingCart />
        </Link>
        <span className=" text-black hover:text-red-600 ">
          <CurrentUserStatus />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
