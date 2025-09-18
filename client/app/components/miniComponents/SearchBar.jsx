'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // 👉 Replace with your own logic (API call, router.push, etc.)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto  bg-white/10  backdrop-blur-sm shadow-md rounded-full"
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>

      <div className="relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-black w-[16p] h-[16px]" />
        </div>

        <input
          type="search"
          id="default-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full p-2 py-1 pl-10 text-sm text-gray-900 rounded-full  "
          placeholder="Search for perfume"
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
