import { useBem } from '@musica-sacra/hooks';

type TagProps = {
    name: string;
    color: string;
    active?: boolean;
    onClick?: () => void;
};

export function Tag({ name, color, active = false, onClick }: TagProps) {
    const { bem, base } = useBem('tag');

    return (
        <div
            className={bem(base, `tag--${color}`, { 'tag--active': active })}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : undefined }}
        >
            {name}
        </div>
    );
}
