import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import logo from '../assets/NavLogo.svg';

function Nav() {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
      
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // 아래로 스크롤 중 → 숨기기
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          // 위로 스크롤 중 → 다시 보이게
          setIsHidden(false);
        }
      
        setLastScrollY(currentScrollY);
      };
      
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`Nav-bar ${isHidden ? 'Nav-hidden' : ''}`}>
            <div className="Nav-section left">
                <Link className='Nav-menu' to={'/'}>REPORT</Link>
                <Link className='Nav-menu' to={'/MyPage'}>MY PAGE</Link>
            </div>

            <div className="Nav-section center">
                <img src={logo} alt="Logo" className="Nav-logo" />
            </div>
        </nav>
    );
}

export default Nav;