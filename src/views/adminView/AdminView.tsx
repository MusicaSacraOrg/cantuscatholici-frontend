import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';
import { Dashboard } from '../../admin/dashboard/Dashboard';

export function AdminView() {
    const { bem } = useBem('view-admin');

    return (
        <LayoutWithSidebar
            sidebar={<Dashboard />}
            isPageLayout={true}
            className={bem()}
        >
            Admin view
        </LayoutWithSidebar>
    );
}
