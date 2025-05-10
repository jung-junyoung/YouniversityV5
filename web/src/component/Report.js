import React, { useState } from "react";
import SideNav from './SideNav';
import SearchBar from './SearchBar';
import AdvancedSearch from './AdvancedSearch';
import ReportList from "./ReportList";

const Report = () => {
  const [filters, setFilters] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = (query) => {
    console.log('검색어:', query);
    // 나중에 검색 로직 연결 가능 (ex: API 요청 or 필터링)
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
    <div className="Report-page">
      <div className="Report-content">
        <SearchBar onSearch={handleSearch} onToggleAdvanced={toggleAdvancedSearch} />
          {showAdvanced && (
            <AdvancedSearch
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
              handleReset={handleReset}
              handleApply={handleApply}
            />
          )}
          
        <ReportList />
      </div>
    </div>
  );
};

export default Report;