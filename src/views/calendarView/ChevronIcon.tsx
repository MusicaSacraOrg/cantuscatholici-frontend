type ChevronIconProps = {
    direction: 'up' | 'down';
    className?: string;
    'aria-hidden'?: boolean;
};

/** V-shaped chevron (stroke, no fill). Use for expand/collapse or list indicators. */
export function ChevronIcon({ direction, className, 'aria-hidden': ariaHidden }: ChevronIconProps) {
    const isUp = direction === 'up';
    const size = 12;
    const strokeWidth = 1.5;
    const points = isUp ? `2,10 6,4 10,10` : `2,4 6,10 10,4`;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={ariaHidden}
        >
            <polyline points={points} />
        </svg>
    );
}
