import React, { useState } from "react";
import SearchBar from './SearchBar';
import AdvancedSearch from './AdvancedSearch';
import ReportList from "./ReportList";

const Report = () => {
  const [filters, setFilters] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    console.log('검색어:', query);
    setSearchQuery(query.toLowerCase());
  };

  const toggleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
  };

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(item => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleReset = () => {
    setSelectedFilters([]);
  };

  const handleApply = ({ filters }) => {
    console.log('Applied Filters:', filters);
    setSelectedFilters(filters);
    setShowAdvanced(false);
  };

  return (
    <div className={`Report-page ${showAdvanced ? 'with-filter' : ''}`}>
      {showAdvanced && (
        <div className="Filter-panel">
          <AdvancedSearch
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            handleReset={handleReset}
            handleApply={handleApply}
          />
        </div>
      )}

      <div className="Report-content">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onSearch={handleSearch}
          onToggleAdvanced={toggleAdvancedSearch}/>
        <ReportList selectedFilters={selectedFilters} searchQuery={searchQuery}/>
      </div>
    </div>
  );
};

export default Report;