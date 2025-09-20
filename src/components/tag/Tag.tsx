import { useBem } from '@musica-sacra/hooks';
import { useState } from 'react';

type TagProps = {
    name: string;
    color: string;
};

export function Tag({ name, color }: TagProps) {
    const { bem, base } = useBem('tag');

    const [active] = useState<boolean>(false);

    return (
        <div className={bem(base, `tag--${color}`, { 'tag--active': active })}>
            {name}
        </div>
    );
}
