import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/NavLogo.svg';
import ReportIcon from '../assets/ReportIcon.svg';
import MyPageIcon from '../assets/MyPageIcon.svg';
import LogOutIcon from '../assets/LogOut.svg';
import HelpIcon from '../assets/info.svg';

function Nav({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="Nav-bar">
        <div className="Nav-top">
            <img src={logo} alt="Logo" className="Nav-logo" />
            <Link to="/Report" className="Nav-icon">
                <img src={ReportIcon} alt='Report'/>
            </Link>
            <Link to="/MyPage" className="Nav-icon">
                <img src={MyPageIcon} alt='My Page'/>
            </Link>
        </div>

        <div className="Nav-bottom">
            <Link to="/Help" className="Nav-icon">
                <img src={HelpIcon} alt='Help'/>
            </Link>
            <button onClick={handleLogout} className="Nav-logout" style={{ background: 'none', border: 'none' }}>
                <img src={LogOutIcon} alt='Sign Out'/>
            </button>
        </div>
    </nav>
  );
}

export default Nav;