import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';
import { HomepageSidebar } from './HomepageSidebar';
import { SearchBar } from '../../components/searchBar/searchBar';

export function HomepageView() {
    const { bem } = useBem('view-homepage');

    return (
        <LayoutWithSidebar
            isPageLayout={true}
            sidebar={<HomepageSidebar />}
            className={bem()}
        >
            <div>
                <SearchBar
                    placeholder={'Zadaj názov piesne, alebo časť textu'}
                />
            </div>
        </LayoutWithSidebar>
    );
}
