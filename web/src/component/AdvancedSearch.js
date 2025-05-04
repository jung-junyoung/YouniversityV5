import React, { useState } from 'react';

function AdvancedSearch({ selectedFilters, toggleFilter, handleReset, handleApply }) {
  const locations = ['Main Entrance', 'Engineering Hall', 'Library', 'Science Hall', 'Fountain'];
  const types = ['Sidewalk block', 'Streetlamp', 'Wall'];

  return (
    <div className="AdvancedSearch">
      <div className="filters">
        <div className="filter-group">
          <h4>Location</h4>
          <div className="filter-options">
            {locations.map((location) => (
              <button
                key={location}
                className={`filter-option ${selectedFilters.includes(location) ? 'selected' : ''}`}
                onClick={() => toggleFilter(location)}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>Category</h4>
          <div className="filter-options">
            {types.map((type) => (
              <button
                key={type}
                className={`filter-option ${selectedFilters.includes(type) ? 'selected' : ''}`}
                onClick={() => toggleFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="selected-tags">
          {selectedFilters.map((filter) => (
            <div key={filter} className="tag">
              {filter}
              <span className="remove-tag" onClick={() => toggleFilter(filter)}>✕</span>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="reset-button" onClick={handleReset}>Reset</button>
          <button className="apply-button" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;