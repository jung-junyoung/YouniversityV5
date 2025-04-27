import React, { useState } from 'react';

function SideNav() {
  const [activeMenu, setActiveMenu] = useState('Submitted');

  return (
    <div className="SideNav">
      <h2 className="SideNav-title">Report</h2>
      <div className="SideNav-menu-box">
        <button
          className={`SideNav-item ${activeMenu === 'Submitted' ? 'active' : ''}`}
          onClick={() => setActiveMenu('Submitted')}
        >
          Submitted
        </button>
        <button
          className={`SideNav-item ${activeMenu === 'In-Progress' ? 'active' : ''}`}
          onClick={() => setActiveMenu('In-Progress')}
        >
          In-Progress
        </button>
        <button
          className={`SideNav-item ${activeMenu === 'Complete' ? 'active' : ''}`}
          onClick={() => setActiveMenu('Complete')}
        >
          Complete
        </button>
      </div>
    </div>
  );
}

export default SideNav;