import { useBem } from '@musica-sacra/hooks';
import { Queen } from '@musica-sacra/layout';
import { Dashboard } from '../../admin/dashboard/Dashboard';
import { AdminRouter } from '../../router/routers/AdminRouter';

export function AdminView() {
    const { bem } = useBem('view-admin');

    return (
        <Queen
            sidebar={<Dashboard />}
            isPageLayout={true}
            fullWidth={true}
            className={bem()}
        >
            <AdminRouter />
        </Queen>
    );
}
