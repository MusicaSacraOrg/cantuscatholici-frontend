import { useBem } from '@musica-sacra/hooks';

type HamburgerProps = {
    onToggle?: () => void;
    isToggled?: boolean;
};

export function Hamburger({ onToggle, isToggled }: HamburgerProps) {
    const { bem, base } = useBem('hamburger');

    return (
        <button
            className={bem(base, {
                'hamburger--open': !!isToggled,
            })}
            onClick={onToggle}
            aria-label="Toggle menu"
        >
            <span className={bem('line')}></span>
            <span className={bem('line')}></span>
            <span className={bem('line')}></span>
        </button>
    );
}
