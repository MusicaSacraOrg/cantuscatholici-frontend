import { NavLink } from 'react-router';
import { useState } from 'react';
import { Hamburger } from './Hamburger';
import { useBem } from '@musica-sacra/hooks';
import { Paths } from '../../router/paths';
import { useUser } from '../../context/userContext/useUser';

export function Navbar() {
    const { bem, base } = useBem('navbar');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useUser();

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
                    <NavLink to="/">CantusCatholici</NavLink>
                </div>
                <div className={bem('links')}>
                    <NavLink to={Paths.SONGS}>Piesne</NavLink>
                    <NavLink to={Paths.CALENDAR}>Liturgický Kalendár</NavLink>
                    <NavLink to={Paths.ABOUT}>O Projekte</NavLink>
                    <NavLink to={user ? `/dashboard/${user.id}` : '/login'}>
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
                    </NavLink>
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
                <NavLink to="/piesne" onClick={closeMobileMenu}>
                    Piesne
                </NavLink>
                <NavLink to="/about" onClick={closeMobileMenu}>
                    About
                </NavLink>
                <NavLink to="/" onClick={closeMobileMenu}>
                    Domov
                </NavLink>
                <NavLink to="/profil" onClick={closeMobileMenu}>
                    Profil
                </NavLink>
            </div>
        </nav>
    );
}
