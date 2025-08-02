import { useState } from 'react';
import './hamburger.scss';

interface HamburgerProps {
    onToggle?: (isOpen: boolean) => void;
}

export function Hamburger({ onToggle }: HamburgerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggle?.(newState);
    };

    return (
        <button
            className={`hamburger ${isOpen ? 'hamburger--open' : ''}`}
            onClick={handleClick}
            aria-label="Toggle menu"
        >
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
        </button>
    );
}
