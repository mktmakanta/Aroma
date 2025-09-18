'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react'; // icon for input

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to the terms before subscribing.');
      return;
    }
    console.log('Subscribed:', email);
    setEmail('');
    setAgree(false);
  };

  return (
    <section className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-8">
        {/* Newsletter Left Side */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">NEW TO AROMA?</h3>
          <p className="text-gray-300 text-sm mb-4">
            Subscribe to our newsletter to get updates on our latest offers!
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4"
          >
            <div className="flex items-center bg-white rounded-md flex-1">
              <Mail className="text-gray-500 ml-3" size={20} />
              <input
                type="email"
                placeholder="Enter E-mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-3 rounded-md text-gray-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-transparent border border-white rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              Subscribe
            </button>
          </form>

          {/* Checkbox */}
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to Aroma’s Privacy and Cookie Policy. You can unsubscribe
              from newsletters at any time. <br />
              <span className="text-orange-400 cursor-pointer">
                I accept the Legal Terms
              </span>
            </span>
          </div>
        </div>

        {/* Right Side (App Download Info Example) */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">DOWNLOAD AROMA FREE APP</h3>
          <p className="text-gray-300 text-sm mb-4">
            Get access to exclusive offers!
          </p>
          <div className="flex gap-4">
            <img
              src="/images/appstore.png"
              alt="App Store"
              className="h-10 cursor-pointer"
            />
            <img
              src="/images/googleplay.png"
              alt="Google Play"
              className="h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
