import React from 'react';
import SearchBar from './SearchBar';
const SearchAndNav = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ul className="flex space-x-8 font-mono text-sm font-medium  ">
        <li className="cursor-pointer hover:text-orange-400">Home</li>
        <li className="cursor-pointer hover:text-orange-400">About</li>
        <li className="cursor-pointer hover:text-orange-400">Contact</li>
      </ul>
      <SearchBar />
    </div>
  );
};

export default SearchAndNav;
