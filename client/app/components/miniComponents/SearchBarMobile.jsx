'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBarMobile = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // 👉 Replace with API call, router.push, etc.
  };

  return (
    <div className="flex justify-center">
      {!isOpen ? (
        // 🔍 Show only the search icon
        <button
          onClick={() => setIsOpen(true)}
          className="p-1 rounded-full bg-white/10 backdrop-blur-sm shadow-md"
        >
          <Search className="w-3.5 h-3.5 text-gray-800 dark:text-white" />
        </button>
      ) : (
        // 🔎 Show expanded search input
        <form
          onSubmit={handleSubmit}
          className="flex items-center max-w-44 bg-white/10 backdrop-blur-sm shadow-md rounded-full px-2.5 py-1"
        >
          <Search className="w-4 h-4 text-gray-800 dark:text-white mr-2" />

          <input
            type="search"
            id="default-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none appearance-none"
            placeholder="Search for perfume"
            autoFocus
            required
          />

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className=" p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-3 h-3 text-gray-800 dark:text-white" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBarMobile;
