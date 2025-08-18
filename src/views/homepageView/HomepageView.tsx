import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';

export function HomepageView() {
    const { bem } = useBem('view-homepage');

    return (
        <LayoutWithSidebar
            isPageLayout={true}
            sidebar={<div>This will be sidebar</div>}
            className={bem()}
        >
            <div>Homepage view</div>
        </LayoutWithSidebar>
    );
}
