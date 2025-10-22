import { useBem } from '@musica-sacra/hooks';
import { Queen } from '@musica-sacra/layout';
import { SongList } from '../../components/songList/SongList';

export function DatabaseView() {
    const { bem } = useBem('view-database');

    return (
        <Queen isPageLayout={true} sidebar={<div></div>} className={bem()}>
            <SongList></SongList>
        </Queen>
    );
}
