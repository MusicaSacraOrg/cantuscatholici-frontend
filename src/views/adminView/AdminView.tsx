import { useBem } from '@musica-sacra/hooks';
import { Queen } from '@musica-sacra/layout';
import { Dashboard } from '../../admin/dashboard/Dashboard';

export function AdminView() {
    const { bem } = useBem('view-admin');

    return (
        <Queen
            sidebar={<Dashboard />}
            isPageLayout={true}
            fullWidth={true}
            className={bem()}
        >
            Admin view
        </Queen>
    );
}
