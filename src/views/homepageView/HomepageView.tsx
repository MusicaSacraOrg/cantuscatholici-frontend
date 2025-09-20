import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';
import { Tag } from '../../components/tag/Tag';

export function HomepageView() {
    const { bem } = useBem('view-homepage');

    return (
        <LayoutWithSidebar
            isPageLayout={true}
            sidebar={<div>This will be sidebar</div>}
            className={bem()}
        >
            <div>
                <Tag name={'Vianocne'} color={'green'} />
                Homepage view
            </div>
        </LayoutWithSidebar>
    );
}
