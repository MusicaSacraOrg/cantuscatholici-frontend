import './hamburger.scss';
import { useBem } from '@musica-sacra/hooks';

type HamburgerProps = {
    onToggle?: () => void;
    isToggled?: boolean;
};

export function Hamburger({ onToggle, isToggled }: HamburgerProps) {
    const { bem } = useBem('hamburger');

    return (
        <button
            className={`hamburger ${isToggled ? 'hamburger--open' : ''}`}
            onClick={onToggle}
            aria-label="Toggle menu"
        >
            <span className={bem('line')}></span>
            <span className={bem('line')}></span>
            <span className={bem('line')}></span>
        </button>
    );
}
