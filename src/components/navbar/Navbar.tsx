import { Link } from 'react-router';
import { useState } from 'react';
import './navbar.scss';
import { Hamburger } from './Hamburger';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuToggle = (isOpen: boolean) => {
        setIsMobileMenuOpen(isOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={isMobileMenuOpen ? 'nav--mobile-open' : ''}>
            <div className="nav__desktop">
                <div className="logo">
                    <span>Cantus Catholici</span>
                </div>
                <div className="search-bar">
                    <span>Search bar</span>
                </div>
                <div className="nav-links">
                    <Link to="/">Piesne</Link>
                    <Link to="/">About</Link>
                    <Link to="/">Domov</Link>
                    <Link to="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 0 24 24"
                            width="30px"
                        >
                            <path
                                d="M12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 
               4 1.79 4 4-1.79 4-4 4zm0 2c2.67 0 8 1.34 
               8 4v2H4v-2c0-2.66 5.33-4 8-4z"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="hamburger-container">
                    <Hamburger onToggle={handleMenuToggle} />
                </div>
            </div>

            <div
                className={`nav__mobile ${isMobileMenuOpen ? 'nav__mobile--open' : ''}`}
            >
                <Link to="/" onClick={closeMobileMenu}>
                    Piesne
                </Link>
                <Link to="/" onClick={closeMobileMenu}>
                    About
                </Link>
                <Link to="/" onClick={closeMobileMenu}>
                    Domov
                </Link>
                <Link to="/" onClick={closeMobileMenu}>
                    Profil
                </Link>
            </div>
        </nav>
    );
}
