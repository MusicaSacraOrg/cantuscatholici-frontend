import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';

export function AdminView() {
    const { bem } = useBem('view-admin');

    return (
        <LayoutWithSidebar
            sidebar={<div>here will be admin dashboard</div>}
            isPageLayout={true}
            className={bem()}
        >
            Admin view
        </LayoutWithSidebar>
    );
}
