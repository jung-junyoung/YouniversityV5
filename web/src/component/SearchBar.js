import React, { useState } from 'react';

function SearchBar({ onSearch, onToggleAdvanced }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="SearchInput"
      />
      <button onClick={handleSearch} className="SearchButton">
        🔍
      </button>
      <button onClick={onToggleAdvanced} className="FilterButton">
        Filters
      </button>
    </div>
  );
}

export default SearchBar;
