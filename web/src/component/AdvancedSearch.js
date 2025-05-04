import React, { useState } from 'react';

function AdvancedSearch({ selectedFilters, toggleFilter, handleReset, handleApply }) {
  const types = ['Sidewalk block', 'Streetlamp', 'Wall'];
  const statuses = ['New', 'In-Progress', 'Complete'];

  return (
    <div className="AdvancedSearch">
      <div className="filters">
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

          <div className="filter-group">
            <h4>Status</h4>
            <div className="filter-options">
              {statuses.map((status) => (
                <button
                  key={status}
                  className={`filter-option ${selectedFilters.includes(status) ? 'selected' : ''}`}
                  onClick={() => toggleFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
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
          <button className="apply-button" onClick={() => handleApply({ filters: selectedFilters })}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;