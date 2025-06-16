import React, { useState } from 'react';

function AdvancedSearch({ selectedFilters, toggleFilter, handleReset, handleApply }) {
  const [openSections, setOpenSections] = useState({
    status: false,
    location: false,
    category: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const categoryOptions = ['Broken Sidewalk', 'Trash Overflow', 'Broken Light', 'Other', 'Fallen Branch']; // category
  const statusOptions = ['New', 'In-Progress', 'Complete'];
  const locationOptions = ['Indoor', 'Outdoor'];

  const renderOptions = (options) => (
    <div className="filter-options-column">
      {options.map((option) => (
        <label key={option} className="filter-option-item">
          <input
            type="checkbox"
            checked={selectedFilters.includes(option)}
            onChange={() => toggleFilter(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="Filter-panel">
      <div className="filter-section">
        <div className="filter-title" onClick={() => toggleSection('status')}>
          Status <span>{openSections.status ? '▾' : '▸'}</span>
        </div>
        {openSections.status && renderOptions(statusOptions)}
      </div>

      <div className="filter-section">
        <div className="filter-title" onClick={() => toggleSection('location')}>
          Location <span>{openSections.location ? '▾' : '▸'}</span>
        </div>
        {openSections.location && renderOptions(locationOptions)}
      </div>

      <div className="filter-section">
        <div className="filter-title" onClick={() => toggleSection('category')}>
          Category <span>{openSections.category ? '▾' : '▸'}</span>
        </div>
        {openSections.category && renderOptions(categoryOptions)}
      </div>

      <div className="selected-tags">
        {selectedFilters.map((filter) => (
          <div key={filter} className="tag">
            {filter}
            <span className="remove-tag" onClick={() => toggleFilter(filter)}>✕</span>
          </div>
        ))}
      </div>

      <div className="filter-actions">
        <button className="reset-button" onClick={handleReset}>Clear all</button>
        <button className="apply-button" onClick={() => handleApply({ filters: selectedFilters })}>Apply</button>
      </div>
    </div>
  );
}

export default AdvancedSearch;