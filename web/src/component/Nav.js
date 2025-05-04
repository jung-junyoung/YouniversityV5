import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import logo from '../assets/NavLogo.svg';

function Nav({ isLoggedIn, onLogout }) {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
      
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          setIsHidden(false);
        }
      
        setLastScrollY(currentScrollY);
    };

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();        
        navigate('/');     
    };
      
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <nav className={`Nav-bar ${isHidden ? 'Nav-hidden' : ''}`}>
            <div className="Nav-section left">
                <Link className='Nav-menu' to={'/Report'}>REPORT</Link>
                <Link className='Nav-menu' to={'/MyPage'}>MY PAGE</Link>
            </div>

            <div className="Nav-section center">
                <img src={logo} alt="Logo" className="Nav-logo" />
            </div>

            <div className="Nav-section right">
                {isLoggedIn ? (
                    <button className="Nav-button right-menu" onClick={handleLogoutClick}>
                        SIGN OUT
                    </button>
                ) : (
                    <Link className="Nav-menu right-menu" to="/">
                        SIGN IN
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Nav;