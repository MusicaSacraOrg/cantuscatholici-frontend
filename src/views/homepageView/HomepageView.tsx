import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';
import { Tag } from '../../components/tag/Tag';
import { HomepageSidebar } from './HomepageSidebar';
import { useQuery } from '@tanstack/react-query';

const fetchTags = () => {
    return;
};

export function HomepageView() {
    const { bem } = useBem('view-homepage');

    const { data, isLoading } = useQuery({
        queryFn: () => fetchTags(),
        queryKey: ['tags'],
    });

    // TODO delete console.log
    console.log(data, isLoading);

    return (
        <LayoutWithSidebar
            isPageLayout={true}
            sidebar={<HomepageSidebar />}
            className={bem()}
        >
            <div>
                <Tag name={'Vianocne'} color={'green'} />
                Homepage view
            </div>
        </LayoutWithSidebar>
    );
}
