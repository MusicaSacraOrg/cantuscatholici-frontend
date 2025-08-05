import { Link } from 'react-router';
import { useState } from 'react';
import { Hamburger } from './Hamburger';
import { useBem } from '@musica-sacra/hooks';

export function Navbar() {
    const { bem, base } = useBem('navbar');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={bem(base, { 'navbar--mobile-open': isMobileMenuOpen })}>
            <div className={bem('desktop')}>
                <div className={bem('logo')}>
                    <Link to="/">CantusCatholici</Link>
                </div>
                <div className={bem('links')}>
                    <Link to="/piesne">Piesne</Link>
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
                <div className={bem('hamburger-container')}>
                    <Hamburger
                        isToggled={isMobileMenuOpen}
                        onToggle={handleMenuToggle}
                    />
                </div>
            </div>

            <div
                className={bem({
                    mobile: true,
                    'mobile--open': isMobileMenuOpen,
                })}
            >
                <Link to="/piesne" onClick={closeMobileMenu}>
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
