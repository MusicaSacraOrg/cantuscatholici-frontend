import { useBem } from '@musica-sacra/hooks';
import { Queen } from '@musica-sacra/layout';
import { HomepageSidebar } from './HomepageSidebar';
import { SearchBar } from '../../components/searchBar/searchBar';
import { SongList } from '../../components/songList/SongList';

export function HomepageView() {
    const { bem } = useBem('view-homepage');

    return (
        <Queen
            isPageLayout={true}
            sidebar={<HomepageSidebar />}
            className={bem()}
        >
            <div>
                <SearchBar
                    placeholder={'Zadaj názov piesne, alebo časť textu'}
                />
                <SongList></SongList>
            </div>
        </Queen>
    );
}
