import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';
import { SongList } from '../../components/songList/SongList';

export function DatabaseView() {
    const { bem } = useBem('view-database');

    return (
        <LayoutWithSidebar
            isPageLayout={true}
            sidebar={<div></div>}
            className={bem()}
        >
            <SongList></SongList>
        </LayoutWithSidebar>
    );
}
