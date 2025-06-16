import React, { useState } from 'react';
import FilterIcon from '../assets/FilterIcon.svg';

function SearchBar({ onSearch, onToggleAdvanced }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="SearchBar-wrapper">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="SearchInput"
        />
      </div>

      <button className="FilterButton" onClick={onToggleAdvanced}>
        <img src={FilterIcon} alt='FilterIcon' className="FilterButton-icon" />
        <span className="FilterButton-text"> Filter </span>
      </button>
    </div>
  );
}

export default SearchBar;
