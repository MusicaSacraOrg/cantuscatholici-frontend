import { useBem } from '@musica-sacra/hooks';

export function Footer() {
    const { bem } = useBem('footer');

    return (
        <div className={bem()}>
            <div className={bem('content')}>MusicaSacraOrg</div>
        </div>
    );
}
