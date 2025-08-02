import './hamburger.scss';

type HamburgerProps = {
    onToggle?: () => void;
    isToggled?: boolean;
};

export function Hamburger({ onToggle, isToggled }: HamburgerProps) {
    return (
        <button
            className={`hamburger ${isToggled ? 'hamburger--open' : ''}`}
            onClick={onToggle}
            aria-label="Toggle menu"
        >
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
        </button>
    );
}
